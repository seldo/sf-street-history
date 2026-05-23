import './globals.css';

const SITE_URL = 'https://sfstreethistory.com';
const TITLE = 'San Francisco Street Name History';
const DESCRIPTION =
  'A quick history of San Francisco told as a tour of various street and place names.';
const OG_IMAGE = '/mission-dolores-small.png';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    images: [{ url: OG_IMAGE, width: 1738, height: 1782 }],
  },
  twitter: {
    card: 'summary',
    site: '@seldo',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
