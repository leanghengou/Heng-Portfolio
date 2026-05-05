import startNowFeaturedImg from "../resources/start-now-featured-img.webp"
import startnowmultiimg1 from "../resources/start-now-imgs/startnow-multi-img-1.png"
import startnowmultiimg2 from "../resources/start-now-imgs/startnow-multi-img-2.png"
import startnowmultiimg3 from "../resources/start-now-imgs/startnow-multi-img-3.png"
import startnowmultiimg4 from "../resources/start-now-imgs/startnow-multi-img-4.png"
import startnowmultiimg5 from "../resources/start-now-imgs/startnow-multi-img-5.png"
import startnowmultiimg6 from "../resources/start-now-imgs/startnow-multi-img-6.png"
export const projects = [
  {
    slug: "start-now-app",
    title: "Start Now",
    category: "User Experience Research & User Interface",
    cover: startNowFeaturedImg,
    intro: {
      description: "StartNow is my first UX case study project that I did in order to learn about UX process, and strategy. I also designed visual for the project to make it both UI and UX project.",
      role: "UX reseacher & Visual designer",
      stack: ["React", "CSS", "Figma"],
      tools:["Figma", "Adobe Illustrator", "Adobe Illustrator", "Adobe Illustrator"],
      duration: "8 weeks",
    },

    sections: [
      {
        type: "bubble-text-badge",
        title: "Design Process",
        content:["Project Assessment","Competitive Analysis", "User Research","Ideate", "Information Architecture", "Wireframes", "UI choice", "Test", "Final Product" ]
      },

       {
        type: "multi-gallery-blocks",
        title: "Project Assesment",
        subtitle:"About",
        description:"StartNow is the fitness application that helps to provide a comfortable fitness tool to help people reach their goal and guide them effective ways on how to do exercise.",
        images:[startnowmultiimg1, startnowmultiimg2,startnowmultiimg3,startnowmultiimg4,startnowmultiimg5,startnowmultiimg6]
      },
     
     
    ],

  
  }
];