// app/layout.js
import Header from '@/components/Header';
import './globals.css';
import { Cairo } from 'next/font/google';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700', '900'] });

export const metadata = {
  title: 'IMB العقارية | استثمار، بيع، وكراء العقارات في الجزائر',
  description: 'المنصة الجزائرية الأولى للاستثمار العقاري الآمن وبيع وشراء العقارات الموثقة.',
  icons: {
            icon: 'https://i.ibb.co/zHQ5bkDr/logo.png',
        },
        openGraph: {
           title: 'IMB العقارية | استثمار، بيع، وكراء العقارات في الجزائر',
  description: 'المنصة الجزائرية الأولى للاستثمار العقاري الآمن وبيع وشراء العقارات الموثقة.',
            images: ['https://i.ibb.co/zHQ5bkDr/logo.png'],
        },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-gray-50 text-gray-900`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}