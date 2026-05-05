import "./reusable-components.css";
export default function MultiGalleryBlocks({ title, images, subtitle, description }) {
  return (

    <section className="startnow-gallery-multi-container project-section-margin">

         <div className="startnow-gallery-multi-content">
        <h2 className="project-section-title">{title}</h2>
        <h3>{subtitle}</h3>
        <p>{description}</p>
        </div>
    <div className="startnow-gallery-multi-img">
        {images.map((item)=>{
            return <img src={item}/>
        })}
    </div>
    
    </section>
  );
}