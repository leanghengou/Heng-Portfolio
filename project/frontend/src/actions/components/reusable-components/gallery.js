export default function Gallery({ title, images }) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="grid">
        {images.map((img, i) => (
          <img key={i} src={img} alt="" />
        ))}
      </div>
    </section>
  );
}