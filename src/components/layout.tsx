import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Navbar is assumed to be responsive already */}
      <Navbar />

      {/* Main content area with responsive padding */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-12">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
