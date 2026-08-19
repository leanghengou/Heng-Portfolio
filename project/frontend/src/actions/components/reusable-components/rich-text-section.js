
export default function RichtextSection({ title, images, subtitle, description }) {
  return (

    <section className="rich-text-container">

        <div className="rich-text-project">
        <h2 className="">{title}</h2>
        
        {subtitle ? <h3>{subtitle}</h3> : null}
        
        {/* An array renders one paragraph per entry; a plain string still
            renders a single one. */}
        {Array.isArray(description) ? (
          description.map((paragraph, i) => <p key={i}>{paragraph}</p>)
        ) : (
          <p>{description}</p>
        )}
        </div>
   
    
    </section>
  );
}