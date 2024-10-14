import { FiMessageSquare } from "react-icons/fi";

function SignedInNav() {
  return (
    <div className="flex items-center justify-between grow">
      <section className="flex flex-col">
        <p className="text-xl font-bold">Dropoff</p>
        <p className="text-xs">Welcome, Khairul Ikhwan</p>
        {/* <p className="text-xs">1 Active Job</p> */}
      </section>
      <FiMessageSquare className="w-8 h-8 hover:cursor-pointer hover:scale-75" />
    </div>
  );
}

export default SignedInNav;
