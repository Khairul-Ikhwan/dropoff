import Footer from "../footer/Footer";
import SignedInNav from "../header/SignedInNav";

function GlobalLayout({ children }) {
  return (
    <div className="flex flex-col justify-between h-screen gap-2 grow outline">
      <div className="flex flex-col gap-2 px-4 py-2 grow">
        <section className="flex items-center px-2 py-3 border rounded shadow-lg h-fit bg-sky-100 border-black/20">
          <SignedInNav />
        </section>
        <div className="px-2 py-3 bg-white rounded shadow-lg grow">
          {children}
        </div>
      </div>
      <section className="p-2 border-t shadow-lg h-fit border-slate-500/20">
        <Footer />
      </section>
    </div>
  );
}

export default GlobalLayout;
