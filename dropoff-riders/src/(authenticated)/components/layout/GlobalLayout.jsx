import SignedInNav from "../header/SignedInNav";

function GlobalLayout({ children }) {
  return (
    <div className="flex flex-col justify-between h-screen gap-2 p-4 grow outline">
      <section className="flex items-center px-2 py-3 rounded shadow-lg h-fit">
        <SignedInNav />
      </section>
      <div className="px-2 py-3 bg-white rounded shadow-lg grow">
        {children}
      </div>
    </div>
  );
}

export default GlobalLayout;
