import { BellIcon } from "@radix-ui/react-icons";

function SignedInNav() {
  return (
    <div className="flex items-center justify-between grow">
      <section className="flex flex-col">
        <p className="text-xl font-bold">Dropoff</p>
        <p className="text-xs">Welcome, Khairul Ikhwan</p>
        {/* <p className="text-xs">1 Active Job</p> */}
      </section>
      <BellIcon className="w-8 h-8 mr-4 hover:cursor-pointer hover:scale-75" />
    </div>
  );
}

export default SignedInNav;
