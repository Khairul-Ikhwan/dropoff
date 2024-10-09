import { BellIcon } from "@radix-ui/react-icons";

function SignedInNav() {
  return (
    <div className="flex items-center justify-between grow">
      <section className="flex flex-col">
        <p className="font-bold">Dropoff</p>
        <p className="text-xs">Welcome, Khairul Ikhwan</p>
      </section>
      <BellIcon className="w-6 h-6 hover:cursor-pointer hover:scale-75" />
    </div>
  );
}

export default SignedInNav;
