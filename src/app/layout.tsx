import type { Metadata } from 'next';
import './globals.css';
import { RoleProvider } from '@/context/RoleContext';

export const metadata: Metadata = {
  title: 'Thulunadan Kalaripayattu Academy | Ancient Warrior Heritage & Modern Management',
  description:
    'Experience the ancient warrior heritage, martial discipline, and authentic Thulunadan lineage of Kalaripayattu. Manage students, attendance, and fees with modern elegance.',
  keywords: [
    'Kalaripayattu',
    'Kalari',
    'Kerala Martial Art',
    'Thulunadan',
    'Meipayattu',
    'Kolthari',
    'Angathari',
    'Verumkai',
    'Student Management',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-kalari-black text-kalari-white antialiased min-h-screen">
        <RoleProvider>
          {children}
        </RoleProvider>
      </body>
    </html>
  );
}
