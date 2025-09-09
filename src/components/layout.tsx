// src/components/layout.tsx
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main >{children}</main>
      <Footer />
    </div>
  );
}
