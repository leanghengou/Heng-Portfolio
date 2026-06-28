import { useParams } from "react-router-dom";
import { projects } from "../data/projects";
import SectionRenderer from "../actions/components/reusable-components/section-renderer";
import styles from "./pagesCustomcss.css";


export default function ProjectPage() {
  const { slug } = useParams();

  const project = projects.find(p => p.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="project-page site-width-container">
      {/* Header */}


<section className="project-component-container">
      <img src={ project.cover}/>
      <div className="project-header">
        <h1>{project.title}</h1>
        <p>{project.intro.description}</p>

        <div className="ptp-project-info">
           <div className="ptp-project-info-card">
            <h4>Role</h4>
            <p>{project.intro.role}</p>
           </div>

             <div className="ptp-project-info-card">
            <h4>Duration</h4>
            <p>{project.intro.duration}</p>
           </div>


             <div className="ptp-project-info-card">
            <h4>Tools</h4>
            <div>{project.intro.tools.map((item, key)=>{
              return <p key={key}>{item}</p>
            })}</div>
           </div>

{project.year && (
  <div className="ptp-project-info-card">
    <h4>Date</h4>
    <p>{project.year}</p>
  </div>
)}
          

            
          
        </div>
      </div>

  </section>


      {/* Sections */}
      {project.sections.map((section, index) => (
        <SectionRenderer key={index} section={section} />
      ))}
    </div>
  );
}
