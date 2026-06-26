
export default function RichtextSection({ title, images, subtitle, description }) {
  return (

    <section className="rich-text-container">

        <div className="rich-text-project">
        <h2 className="">{title}</h2>
        
        {subtitle ? <h3>{subtitle}</h3> : null}
        
        <p>{description}</p>
        </div>
   
    
    </section>
  );
}