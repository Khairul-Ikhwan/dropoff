import { CheckIcon, DownloadIcon, GearIcon } from "@radix-ui/react-icons";
import { CiBoxes } from "react-icons/ci";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="w-1/4">
        <Link to="/">
          <section className="flex flex-col items-center content-between justify-center gap-2">
            <DownloadIcon />
            <p className="text-center">jobs</p>
          </section>
        </Link>
      </div>
      <div className="w-1/4">
        <Link to="/active">
          <section className="flex flex-col items-center content-between justify-center gap-2">
            <CiBoxes />
            <p className="text-center">active</p>
          </section>
        </Link>
      </div>
      {/*    <section className="flex flex-col items-center content-between justify-center w-1/4 gap-2">
        <BiWallet />
        <p className="text-center">wallet</p>
      </section> */}
      <section className="flex flex-col items-center content-between justify-center w-1/4 gap-2">
        <CheckIcon />
        <p className="text-center">completed</p>
      </section>
      <section className="flex flex-col items-center content-between justify-center w-1/4 gap-2">
        <GearIcon />
        <p className="text-center">settings</p>
      </section>
    </div>
  );
}

export default Footer;
