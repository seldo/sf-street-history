import slides from '../../../data/slides.json';
import Slideshow from '../../../components/Slideshow';

export function generateStaticParams() {
  return slides.map((_, index) => ({ id: String(index) }));
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text, max) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + '…';
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const index = Number(id);
  const slide = slides[index] ?? slides[0];
  const plainText = stripHtml(slide.text);
  const title = slide.title
    ? `${slide.title} — San Francisco Street History`
    : `San Francisco Street History — slide ${index + 1}`;
  const description = truncate(plainText, 160);
  const path = `/street/${index}/`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function StreetPage({ params }) {
  const { id } = await params;
  const index = Number(id);
  const initialSlide =
    Number.isInteger(index) && index >= 0 && index < slides.length ? index : 0;
  return <Slideshow slides={slides} initialSlide={initialSlide} />;
}
