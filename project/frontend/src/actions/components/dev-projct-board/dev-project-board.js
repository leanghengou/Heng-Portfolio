import React, { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import "./dev-project-board.css";
import gsap from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(Draggable);

const DevProjectBoard = () => {
  const boardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      Draggable.create(".drag-card", {
    

      });
    }, boardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div className="site-width-container dev-project-board-container">
        <div className="dev-project-board-text-container">
          <h5>
            <span className="highlight-tag-box-style">Development projects</span>
          </h5>
          <h3>Recent Git projects</h3>
          <p>
            We strive to provide the highest quality clothing at the best prices,
            so you can look your best without breaking the bank.
          </p>
          <div className="button-container-dev-project">
            <a style={{ maxWidth: "170px" }} className="btn">
              View project
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </a>
          </div>
        </div>

    
        <div ref={boardRef} className="project-board">
          <div className="dev-project-board"></div>

          <div className="drag-card project-dev-card-one">
            <CardTitle>Escape the war zone</CardTitle>
            <CardDescription>
              You can look your best without breaking the bank.
            </CardDescription>
          </div>

          <div style={{ color: "#005457" }} className="drag-card project-dev-card-two">
            <CardTitle>InsperU</CardTitle>
            <CardDescription>
              You can look your best without breaking the bank.
            </CardDescription>
          </div>

          <div className="drag-card project-dev-card-three" />
          <div className="drag-card project-dev-card-four" />
          <div className="drag-card project-dev-card-five" />
        </div>
      </div>
    </div>
  );
};

const CardTitle = styled.h5`
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
  margin: 0px;
`;

const CardDescription = styled.p`
  font-size: 13px;
  line-height: 1.37em;
`;

export default DevProjectBoard;
