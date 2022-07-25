import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ items, children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar navItem={items} />
      <main className="mt-32 grow">{children}</main>
      <Footer />
    </div>
  );
}
