import slides from '../../../data/slides.json';
import Slideshow from '../../../components/Slideshow';

export function generateStaticParams() {
  return slides.map((_, index) => ({ id: String(index) }));
}

export default async function StreetPage({ params }) {
  const { id } = await params;
  const index = Number(id);
  const initialSlide =
    Number.isInteger(index) && index >= 0 && index < slides.length ? index : 0;
  return <Slideshow slides={slides} initialSlide={initialSlide} />;
}
