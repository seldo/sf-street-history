import slides from '../data/slides.json';
import Slideshow from '../components/Slideshow';

export default function HomePage() {
  return <Slideshow slides={slides} initialSlide={0} />;
}
