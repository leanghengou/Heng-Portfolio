export default function Hero({ title, images }) {
  return (
    <section>
      <h2>{title}</h2>
      <img src={images[0]} alt="" />
    </section>
  );
}