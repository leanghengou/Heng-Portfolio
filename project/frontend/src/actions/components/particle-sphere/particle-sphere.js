// Particle Sphere — ported from Originkit (Framer) to plain JS/React.
// A rotating Fibonacci-distributed particle sphere (three.js) that reacts to
// the cursor (repulsion + click/touch scatter) and can be dragged/thrown.
//
// NOTE: the original file was truncated in transit; the tail (touch-scatter
// completion, listener registration, cleanup, JSX, defaults) was reconstructed
// — handleTouchStart mirrors handleClick, the rest is standard setup/teardown.

import React, { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Points,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  SphereGeometry,
  MeshBasicMaterial,
  InstancedMesh,
  Matrix4,
  Group,
  Vector3,
  AdditiveBlending,
} from "three";

const RenderTarget = {
  current: () => "preview",
  canvas: "canvas",
  export: "export",
  thumbnail: "thumbnail",
  preview: "preview",
};

const cssVariableRegex =
  /var\s*\(\s*(--[\w-]+)(?:\s*,\s*((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*))?\s*\)/;

function extractDefaultValue(cssVar) {
  if (!cssVar || !cssVar.startsWith("var(")) return cssVar;
  const match = cssVariableRegex.exec(cssVar);
  if (!match) return cssVar;
  const fallback = (match[2] || "").trim();
  if (fallback.startsWith("var(")) return extractDefaultValue(fallback);
  return fallback || cssVar;
}

function resolveTokenColor(input) {
  if (typeof input !== "string") return input;
  if (!input.startsWith("var(")) return input;
  return extractDefaultValue(input);
}

function parseColorToRgba(input) {
  if (!input || input.trim() === "") return { r: 0, g: 0, b: 0, a: 0 };
  const str = input.trim();

  const rgbaMatch = str.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i
  );
  if (rgbaMatch) {
    const r = Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255;
    const g = Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255;
    const b = Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255;
    const a =
      rgbaMatch[4] !== undefined
        ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4])))
        : 1;
    return { r, g, b, a };
  }

  const hex = str.replace(/^#/, "");
  if (hex.length === 8) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: 1,
    };
  }
  if (hex.length === 4) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: parseInt(hex[3] + hex[3], 16) / 255,
    };
  }
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: 1,
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

function mapLinear(value, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

function mapSpeedUiToInternal(ui) {
  return mapLinear(ui, 0.1, 1.0, 0.01, 0.05);
}

function mapScaleUiToMultiplier(ui) {
  const clamped = Math.max(0, Math.min(1, ui));
  return mapLinear(clamped, 0, 1.0, 0.25, 1.25);
}

function mapParticleSizeUiToInternal(ui) {
  const clamped = Math.max(0.1, Math.min(1, ui));
  return mapLinear(clamped, 0.1, 1.0, 0.01, 0.1);
}

function mapCursorStrengthUiToMultiplier(ui) {
  const clamped = Math.max(0, Math.min(1, ui));
  return mapLinear(clamped, 0, 1.0, 0, 15);
}

const CURSOR_PHYSICS = {
  RETURN_FORCE: 0.015,
  FRICTION: 0.94,
};

const COMPONENT_DEFAULTS = {
  particlesCount: 10000,
  particleScale: 4,
  speed: 20,
  smoothing: 7,
  scale: 10,
  stopOnHover: false,
  rotationDirection: "clockwise",
  dragSpeed: 5,
  drag: true,
  cursorOn: true,
  cursorRadiusUI: 75,
  cursorStrengthUI: 10,
  clickForce: 5,
  sphereColor: "#ffffff",
};

export default function ParticleSphere(__props) {
  const {
    particlesCount = 10000,
    speed = 20,
    smoothing = 7,
    scale = 10,
    stopOnHover = false,
    rotationDirection = "clockwise",
    dragSpeed = 5,
    drag = true,
    particleScale = 4,
    cursorOn = true,
    cursorRadiusUI = 75,
    cursorStrengthUI = 10,
    clickForce = 5,
    sphereColor = "#ffffff",
    style,
  } = { ...COMPONENT_DEFAULTS, ...__props };

  const particlesConfig = { shape: "sphere", scale: particleScale };
  const cursorConfig = {
    enabled: cursorOn,
    radius: cursorRadiusUI,
    strength: cursorStrengthUI,
    clickForce,
  };

  const speedN = speed / 10;
  const smoothingN = smoothing / 10;
  const scaleN = scale / 10;
  const dragN = dragSpeed / 10;
  const sizeN = particlesConfig.scale / 10;
  const strengthN = cursorConfig.strength / 10;

  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const particlesGroupRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef(null);
  const baseParticlePositionsRef = useRef([]);
  const particleDisplacementsRef = useRef([]);
  const particleScatterVelocitiesRef = useRef([]);

  const isCanvasRef = useRef(null);
  if (isCanvasRef.current === null) {
    isCanvasRef.current = RenderTarget.current() === RenderTarget.canvas;
  }
  const isCanvas = isCanvasRef.current;

  const rotationSpeed = React.useMemo(() => {
    const baseSpeed = mapSpeedUiToInternal(speedN);
    return rotationDirection === "anticlockwise" ? -baseSpeed : baseSpeed;
  }, [speedN, rotationDirection]);

  const scaleMultiplier = React.useMemo(
    () => mapScaleUiToMultiplier(scaleN),
    [scaleN]
  );

  const particleSize = React.useMemo(
    () => mapParticleSizeUiToInternal(sizeN),
    [sizeN]
  );

  const cursorRadius = React.useMemo(
    () => Math.max(0, Math.min(600, cursorConfig.radius)),
    [cursorConfig.radius]
  );

  const cursorStrength = React.useMemo(
    () => mapCursorStrengthUiToMultiplier(strengthN),
    [strengthN]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth =
      container.clientWidth || container.offsetWidth || 400;
    const containerHeight =
      container.clientHeight || container.offsetHeight || 400;

    const canvasOverflowMultiplier = 2.5;
    const canvasWidth = containerWidth * canvasOverflowMultiplier;
    const canvasHeight = containerHeight * canvasOverflowMultiplier;

    const scene = new Scene();
    sceneRef.current = scene;

    const baseFOV = 50;
    const adjustedFOV =
      2 *
      Math.atan(
        Math.tan((baseFOV * Math.PI) / 180 / 2) * canvasOverflowMultiplier
      ) *
      (180 / Math.PI);

    const camera = new PerspectiveCamera(
      adjustedFOV,
      canvasWidth / canvasHeight,
      0.1,
      1000
    );
    const baseCameraDistance = 3.0;
    const currentSphereRadius = 1.0 * scaleMultiplier;
    const cameraDistance = Math.max(
      baseCameraDistance,
      currentSphereRadius + 1.0
    );
    camera.position.z = cameraDistance;
    cameraRef.current = camera;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = "srgb";
    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    const offsetX = (canvasWidth - containerWidth) / 2;
    const offsetY = (canvasHeight - containerHeight) / 2;
    canvas.style.left = `-${offsetX}px`;
    canvas.style.top = `-${offsetY}px`;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.display = "block";
    container.appendChild(canvas);
    rendererRef.current = renderer;

    const vertices = [];

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const baseSphereRadius = 1.0;
    const sphereRadius = baseSphereRadius * scaleMultiplier;

    baseParticlePositionsRef.current = [];
    particleDisplacementsRef.current = [];
    particleScatterVelocitiesRef.current = [];

    const resolvedSphereColor = resolveTokenColor(sphereColor);
    const sphereRgba = parseColorToRgba(resolvedSphereColor || sphereColor);
    const baseColorObj = resolvedSphereColor
      ? new Color(resolvedSphereColor)
      : new Color(sphereRgba.r, sphereRgba.g, sphereRgba.b);
    const particleOpacity = sphereRgba.a;

    for (let i = 0; i < particlesCount; i++) {
      const y = 1 - (i / (particlesCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      const posX = x * sphereRadius;
      const posY = y * sphereRadius;
      const posZ = z * sphereRadius;
      vertices.push(posX, posY, posZ);

      baseParticlePositionsRef.current.push(new Vector3(posX, posY, posZ));
      particleDisplacementsRef.current.push(new Vector3(0, 0, 0));
      particleScatterVelocitiesRef.current.push(new Vector3(0, 0, 0));
    }

    const particleShape = particlesConfig.shape || "sphere";
    let particles;

    if (particleShape === "sphere") {
      const dotRadius = particleSize * 0.15;
      const sphereGeometry = new SphereGeometry(dotRadius, 8, 8);
      const sphereMaterial = new MeshBasicMaterial({
        color: 0xffffff,
        blending: AdditiveBlending,
        transparent: particleOpacity < 1,
        opacity: particleOpacity,
      });

      particles = new InstancedMesh(sphereGeometry, sphereMaterial, particlesCount);

      const matrix = new Matrix4();
      for (let i = 0; i < particlesCount; i++) {
        const idx = i * 3;
        matrix.setPosition(vertices[idx], vertices[idx + 1], vertices[idx + 2]);
        particles.setMatrixAt(i, matrix);
      }
      particles.instanceMatrix.needsUpdate = true;

      const instanceColors = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount; i++) {
        const idx = i * 3;
        instanceColors[idx] = baseColorObj.r;
        instanceColors[idx + 1] = baseColorObj.g;
        instanceColors[idx + 2] = baseColorObj.b;
      }
      particles.instanceColor = new Float32BufferAttribute(instanceColors, 3);
      sphereMaterial.vertexColors = false;
      particles.instanceColor.needsUpdate = true;
    } else {
      const particlesGeometry = new BufferGeometry();
      particlesGeometry.setAttribute(
        "position",
        new Float32BufferAttribute(vertices, 3)
      );

      const colors = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount; i++) {
        const idx = i * 3;
        colors[idx] = baseColorObj.r;
        colors[idx + 1] = baseColorObj.g;
        colors[idx + 2] = baseColorObj.b;
      }
      particlesGeometry.setAttribute(
        "color",
        new Float32BufferAttribute(colors, 3)
      );

      const particlesMaterial = new PointsMaterial({
        size: particleSize,
        color: 0xffffff,
        blending: AdditiveBlending,
        depthTest: false,
        transparent: particleOpacity < 1,
        opacity: particleOpacity,
        vertexColors: true,
      });

      particles = new Points(particlesGeometry, particlesMaterial);
    }

    particlesRef.current = particles;

    const particlesGroup = new Group();
    particlesGroupRef.current = particlesGroup;
    particlesGroup.add(particles);
    scene.add(particlesGroup);

    const rotation = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    let isDragging = false;
    let isHovering = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastDragTime = 0;
    let animationFrameId = null;

    let lastFrameTime = performance.now();
    const targetDeltaTime = 1000 / 60;

    const lerpFactor =
      smoothingN === 0 ? 1 : mapLinear(smoothingN, 0, 1, 0.4, 0.03);
    const velocityDecay = mapLinear(smoothingN, 0, 1, 0.7, 0.96);

    const animate = () => {
      animateCore();
    };

    const animateCore = () => {
      const now = performance.now();

      const deltaTime = now - lastFrameTime;
      lastFrameTime = now;
      const deltaFactor = deltaTime / targetDeltaTime;

      let needsRender = false;
      const threshold = 0.01;

      const canAutoRotate = true;
      if (
        !isDragging &&
        rotationSpeed !== 0 &&
        canAutoRotate &&
        (!stopOnHover || !isHovering)
      ) {
        targetRotation.x += rotationSpeed * 0.1 * deltaFactor;
      }

      if (!isDragging && smoothingN > 0) {
        if (
          Math.abs(velocity.x) > threshold ||
          Math.abs(velocity.y) > threshold
        ) {
          targetRotation.x += velocity.x * deltaFactor;
          targetRotation.y += velocity.y * deltaFactor;
          targetRotation.y = Math.max(
            -Math.PI / 2,
            Math.min(Math.PI / 2, targetRotation.y)
          );
          const decayFactor = Math.pow(velocityDecay, deltaFactor);
          velocity.x *= decayFactor;
          velocity.y *= decayFactor;
        } else {
          velocity.x = 0;
          velocity.y = 0;
        }
      }

      const dx = targetRotation.x - rotation.x;
      const dy = targetRotation.y - rotation.y;

      if (
        Math.abs(dx) > threshold ||
        Math.abs(dy) > threshold ||
        rotationSpeed !== 0 ||
        isDragging
      ) {
        const timeLerpFactor = 1 - Math.pow(1 - lerpFactor, deltaFactor);
        rotation.x += dx * timeLerpFactor;
        rotation.y += dy * timeLerpFactor;
        rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.y));
        needsRender = true;
      }

      particlesGroup.rotation.y = rotation.x;
      particlesGroup.rotation.x = rotation.y;
      particlesGroup.updateMatrixWorld(true);

      const currentContainerWidth = containerRef.current?.clientWidth || 400;
      const currentContainerHeight = containerRef.current?.clientHeight || 400;
      const currentCanvasWidth =
        currentContainerWidth * canvasOverflowMultiplier;
      const currentCanvasHeight =
        currentContainerHeight * canvasOverflowMultiplier;
      const currentCamera = cameraRef.current;
      const cursorRadiusSquared = cursorRadius * cursorRadius;

      if (cursorConfig.enabled && baseParticlePositionsRef.current.length > 0) {
        for (let i = 0; i < baseParticlePositionsRef.current.length; i++) {
          const basePos = baseParticlePositionsRef.current[i];
          const displacement = particleDisplacementsRef.current[i];

          if (mouseRef.current) {
            const mouse = mouseRef.current;

            const currentLocalPos = new Vector3();
            currentLocalPos.copy(basePos);
            currentLocalPos.add(displacement);

            const worldPos = new Vector3();
            worldPos.copy(currentLocalPos);
            worldPos.applyMatrix4(particlesGroup.matrixWorld);

            const projected = worldPos.clone().project(currentCamera);
            const screenX = (projected.x * 0.5 + 0.5) * currentCanvasWidth;
            const screenY = (-projected.y * 0.5 + 0.5) * currentCanvasHeight;

            const mdx = mouse.x - screenX;
            const mdy = mouse.y - screenY;
            const distanceSquared = mdx * mdx + mdy * mdy;

            if (
              distanceSquared < cursorRadiusSquared &&
              distanceSquared > 0 &&
              worldPos.z > 0
            ) {
              const distance = Math.sqrt(distanceSquared);
              const force = (cursorRadius - distance) / cursorRadius;
              const angle = Math.atan2(mdy, mdx);

              const cameraRight = new Vector3();
              const cameraUp = new Vector3();
              cameraRight
                .setFromMatrixColumn(currentCamera.matrixWorld, 0)
                .normalize();
              cameraUp
                .setFromMatrixColumn(currentCamera.matrixWorld, 1)
                .normalize();

              const repulsion2D = force * cursorStrength * speedN * deltaFactor;
              const repulsionX = -Math.cos(angle) * repulsion2D * 0.01;
              const repulsionY = Math.sin(angle) * repulsion2D * 0.01;

              const worldRepulsion = new Vector3();
              worldRepulsion.addScaledVector(cameraRight, repulsionX);
              worldRepulsion.addScaledVector(cameraUp, repulsionY);

              const localRepulsion = new Vector3();
              localRepulsion.copy(worldRepulsion);
              const inverseGroupMatrix = new Matrix4();
              inverseGroupMatrix.copy(particlesGroup.matrixWorld).invert();
              localRepulsion.applyMatrix4(inverseGroupMatrix);

              displacement.add(localRepulsion);
            }
          }

          const frictionFactor = Math.pow(CURSOR_PHYSICS.FRICTION, deltaFactor);
          const returnForce =
            CURSOR_PHYSICS.RETURN_FORCE * speedN * deltaFactor;
          displacement.multiplyScalar(frictionFactor);
          displacement.multiplyScalar(1 - returnForce);
        }
      }

      if (particleScatterVelocitiesRef.current.length > 0) {
        for (let i = 0; i < particleScatterVelocitiesRef.current.length; i++) {
          const scatterVelocity = particleScatterVelocitiesRef.current[i];
          const displacement = particleDisplacementsRef.current[i];

          displacement.addScaledVector(scatterVelocity, deltaFactor * 0.1);

          const scatterFriction = Math.pow(0.95, deltaFactor);
          scatterVelocity.multiplyScalar(scatterFriction);

          const scatterReturnForce =
            CURSOR_PHYSICS.RETURN_FORCE * speedN * deltaFactor;
          scatterVelocity.multiplyScalar(1 - scatterReturnForce);
        }
      }

      const shape = particlesConfig.shape || "sphere";

      if (shape === "sphere" && particlesRef.current) {
        const matrix = new Matrix4();
        for (let i = 0; i < baseParticlePositionsRef.current.length; i++) {
          const basePos = baseParticlePositionsRef.current[i];
          const displacement = particleDisplacementsRef.current[i];
          const finalPos = new Vector3();
          finalPos.copy(basePos);
          finalPos.add(displacement);
          matrix.setPosition(finalPos.x, finalPos.y, finalPos.z);
          particlesRef.current.setMatrixAt(i, matrix);
        }
        particlesRef.current.instanceMatrix.needsUpdate = true;
      } else if (shape === "cube" && particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position;
        for (let i = 0; i < baseParticlePositionsRef.current.length; i++) {
          const basePos = baseParticlePositionsRef.current[i];
          const displacement = particleDisplacementsRef.current[i];
          const finalPos = new Vector3();
          finalPos.copy(basePos);
          finalPos.add(displacement);
          positions.setXYZ(i, finalPos.x, finalPos.y, finalPos.z);
        }
        positions.needsUpdate = true;
      }

      needsRender = true;

      if (needsRender || rotationSpeed !== 0 || isDragging) {
        renderer.render(scene, camera);
      }

      const hasVelocity =
        Math.abs(velocity.x) > threshold || Math.abs(velocity.y) > threshold;
      const hasLerpDelta =
        Math.abs(dx) > threshold || Math.abs(dy) > threshold;
      const hasCursorInteraction =
        cursorConfig.enabled &&
        particleDisplacementsRef.current.some(
          (disp) =>
            Math.abs(disp.x) > threshold ||
            Math.abs(disp.y) > threshold ||
            Math.abs(disp.z) > threshold
        );
      const needsContinue =
        isCanvas ||
        isDragging ||
        rotationSpeed !== 0 ||
        hasVelocity ||
        hasLerpDelta ||
        hasCursorInteraction;

      if (needsContinue) {
        animationFrameId = requestAnimationFrame(animate);
        animationFrameRef.current = animationFrameId;
      } else {
        animationFrameId = null;
        animationFrameRef.current = null;
      }
    };

    const startAnimation = () => {
      if (animationFrameId === null) {
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
        animationFrameRef.current = animationFrameId;
      }
    };

    startAnimation();

    const handleMouseDown = (event) => {
      if (!drag) return;
      isDragging = true;
      velocity.x = 0;
      velocity.y = 0;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      lastDragTime = performance.now();
      startAnimation();

      const handleMouseMove = (moveEvent) => {
        const currentTime = performance.now();
        const timeSinceLastMove = currentTime - lastDragTime;

        const sensitivity = mapLinear(dragN, 0, 1, 0.001, 0.02);
        const mdx = moveEvent.clientX - lastMouseX;
        const mdy = moveEvent.clientY - lastMouseY;

        targetRotation.x += mdx * sensitivity;
        targetRotation.y += mdy * sensitivity;
        targetRotation.y = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, targetRotation.y)
        );

        if (timeSinceLastMove > 0) {
          const timeNormalization = targetDeltaTime / timeSinceLastMove;
          velocity.x = mdx * sensitivity * 0.3 * timeNormalization;
          velocity.y = mdy * sensitivity * 0.3 * timeNormalization;
        }

        lastMouseX = moveEvent.clientX;
        lastMouseY = moveEvent.clientY;
        lastDragTime = currentTime;
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        isDragging = false;
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    if (drag) {
      canvas.addEventListener("mousedown", handleMouseDown);
    }

    const handleMouseMoveHover = (event) => {
      if (!stopOnHover) return;
      const containerRect = container.getBoundingClientRect();
      const mouseX = event.clientX - containerRect.left;
      const mouseY = event.clientY - containerRect.top;
      isHovering =
        mouseX >= 0 &&
        mouseX <= containerRect.width &&
        mouseY >= 0 &&
        mouseY <= containerRect.height;
    };

    if (stopOnHover) {
      canvas.addEventListener("mousemove", handleMouseMoveHover);
    }

    const handleMouseMoveCursor = (event) => {
      const containerRect = container.getBoundingClientRect();
      const mouseXInContainer = event.clientX - containerRect.left;
      const mouseYInContainer = event.clientY - containerRect.top;
      if (
        mouseXInContainer >= 0 &&
        mouseXInContainer <= containerRect.width &&
        mouseYInContainer >= 0 &&
        mouseYInContainer <= containerRect.height
      ) {
        mouseRef.current = {
          x: mouseXInContainer + offsetX,
          y: mouseYInContainer + offsetY,
        };
        startAnimation();
      } else {
        mouseRef.current = null;
      }
    };

    const handleMouseLeaveCursor = () => {
      mouseRef.current = null;
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      const containerRect = container.getBoundingClientRect();
      const touch = event.touches[0];
      if (touch) {
        const touchXInContainer = touch.clientX - containerRect.left;
        const touchYInContainer = touch.clientY - containerRect.top;
        if (
          touchXInContainer >= 0 &&
          touchXInContainer <= containerRect.width &&
          touchYInContainer >= 0 &&
          touchYInContainer <= containerRect.height
        ) {
          mouseRef.current = {
            x: touchXInContainer + offsetX,
            y: touchYInContainer + offsetY,
          };
          startAnimation();
        } else {
          mouseRef.current = null;
        }
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = null;
    };

    // Shared radial scatter used by click + touchstart.
    const applyScatter = (pointX, pointY, cw, ch) => {
      if (!cursorConfig.enabled || !cursorConfig.clickForce) return;
      particlesGroup.updateMatrixWorld(true);

      const cursorRadiusSquared = cursorRadius * cursorRadius;
      const force0 = cursorConfig.clickForce || 10;
      const currentCamera = cameraRef.current;

      const ndcX = (pointX / cw) * 2 - 1;
      const ndcY = 1 - (pointY / ch) * 2;

      const ray = new Vector3(ndcX, ndcY, 0.5);
      ray.unproject(currentCamera);

      const cameraWorldPos = new Vector3();
      cameraWorldPos.setFromMatrixPosition(currentCamera.matrixWorld);

      const direction = new Vector3();
      direction.subVectors(ray, cameraWorldPos).normalize();

      const sphereCenter = new Vector3(0, 0, 0);
      const cameraToCenter = new Vector3();
      cameraToCenter.subVectors(sphereCenter, cameraWorldPos);
      const sphereDistance = cameraToCenter.length();
      const pointWorldPos = new Vector3();
      pointWorldPos.copy(cameraWorldPos);
      pointWorldPos.addScaledVector(direction, sphereDistance);

      for (let i = 0; i < baseParticlePositionsRef.current.length; i++) {
        const basePos = baseParticlePositionsRef.current[i];
        const displacement = particleDisplacementsRef.current[i];
        const scatterVelocity = particleScatterVelocitiesRef.current[i];

        const currentLocalPos = new Vector3();
        currentLocalPos.copy(basePos);
        currentLocalPos.add(displacement);

        const worldPos = new Vector3();
        worldPos.copy(currentLocalPos);
        worldPos.applyMatrix4(particlesGroup.matrixWorld);

        const projected = worldPos.clone().project(currentCamera);
        const screenX = (projected.x * 0.5 + 0.5) * cw;
        const screenY = (-projected.y * 0.5 + 0.5) * ch;

        const ddx = pointX - screenX;
        const ddy = pointY - screenY;
        const distanceSquared = ddx * ddx + ddy * ddy;

        if (distanceSquared < cursorRadiusSquared && distanceSquared > 0) {
          const screenDistance = Math.sqrt(distanceSquared);
          const force =
            ((cursorRadius - screenDistance) / cursorRadius) * force0;

          const radialDirection = new Vector3();
          radialDirection.subVectors(worldPos, pointWorldPos);
          const radialDistance = radialDirection.length();

          if (radialDistance > 0.001) {
            radialDirection.normalize();
            const scatterMagnitude = force * 0.5;
            const worldScatter = new Vector3();
            worldScatter.copy(radialDirection);
            worldScatter.multiplyScalar(scatterMagnitude);

            const localScatter = new Vector3();
            localScatter.copy(worldScatter);
            const inverseGroupMatrix = new Matrix4();
            inverseGroupMatrix.copy(particlesGroup.matrixWorld).invert();
            localScatter.applyMatrix4(inverseGroupMatrix);

            scatterVelocity.add(localScatter);
          }
        }
      }

      startAnimation();
    };

    const handleClick = (event) => {
      const containerRect = container.getBoundingClientRect();
      const clickX = event.clientX - containerRect.left + offsetX;
      const clickY = event.clientY - containerRect.top + offsetY;
      const cw = (containerRef.current?.clientWidth || 400) * canvasOverflowMultiplier;
      const ch = (containerRef.current?.clientHeight || 400) * canvasOverflowMultiplier;
      applyScatter(clickX, clickY, cw, ch);
    };

    const handleTouchStart = (event) => {
      event.preventDefault();
      const containerRect = container.getBoundingClientRect();
      const touch = event.touches[0];
      if (!touch) return;
      const touchX = touch.clientX - containerRect.left + offsetX;
      const touchY = touch.clientY - containerRect.top + offsetY;
      const cw = (containerRef.current?.clientWidth || 400) * canvasOverflowMultiplier;
      const ch = (containerRef.current?.clientHeight || 400) * canvasOverflowMultiplier;
      applyScatter(touchX, touchY, cw, ch);
    };

    container.addEventListener("mousemove", handleMouseMoveCursor);
    container.addEventListener("mouseleave", handleMouseLeaveCursor);
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      if (drag) canvas.removeEventListener("mousedown", handleMouseDown);
      if (stopOnHover) canvas.removeEventListener("mousemove", handleMouseMoveHover);
      container.removeEventListener("mousemove", handleMouseMoveCursor);
      container.removeEventListener("mouseleave", handleMouseLeaveCursor);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleTouchStart);

      if (particles.geometry) particles.geometry.dispose();
      if (particles.material) particles.material.dispose();
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [
    particlesCount,
    speedN,
    smoothingN,
    scaleMultiplier,
    particleSize,
    stopOnHover,
    rotationSpeed,
    dragN,
    drag,
    cursorOn,
    cursorRadius,
    cursorStrength,
    clickForce,
    sphereColor,
    isCanvas,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
        ...(style || {}),
      }}
    />
  );
}
