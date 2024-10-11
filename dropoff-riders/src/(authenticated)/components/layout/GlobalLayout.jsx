import Footer from "../footer/Footer";
import SignedInNav from "../header/SignedInNav";

function GlobalLayout({ children }) {
  return (
    <div className="flex flex-col content-between h-screen">
      <section className="flex items-center px-2 py-3 text-white bg-black border shadow-lg h-fit border-black/20">
        <SignedInNav />
      </section>
      <div className="flex flex-col px-4 py-3 overflow-y-scroll bg-white rounded shadow-lg grow">
        {children}
      </div>

      <section className="p-2 text-white bg-black shadow-lg h-fit">
        <Footer />
      </section>
    </div>
  );
}

export default GlobalLayout;
