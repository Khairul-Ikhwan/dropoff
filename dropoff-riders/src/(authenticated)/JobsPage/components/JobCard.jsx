import { format } from "date-fns";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function JobCard({ job }) {
  return (
    <div className="flex flex-col gap-2 overflow-hidden border rounded-lg shadow-xl bg-sky-50 border-slate-500/25">
      <section className="flex items-center justify-between p-2 px-4 text-lg text-white bg-black">
        <p>{job.jobType}</p>
        <p>{job.pickupDate}</p>
        <p>${job.deliveryPrice}</p>
      </section>
      <div className="flex justify-center">
        <p>{job.pickupTime}</p>
      </div>
      <div className="flex flex-col justify-center px-3 h-fit ">
        <div className="flex flex-col gap-3 px-2">
          <section className="flex items-center justify-between p-2 bg-white border rounded-md border-slate-500">
            <p className="text-sm text-left">
              Pickup <br />{" "}
              <span className="text-xs">
                ({job.pickupLocations.length}{" "}
                {job.pickupLocations.length > 1 ? "locations" : "location"})
              </span>
              <br />
              <span className="font-semibold text-md">
                {job.pickupLocations[0].streetname}
              </span>
            </p>
            <div>
              <MdOutlineKeyboardDoubleArrowRight />
            </div>
            <p className="text-sm text-right">
              Dropoff <br />{" "}
              <span className="text-xs">
                ({job.dropoffLocations.length}{" "}
                {job.dropoffLocations.length > 1 ? "locations" : "location"})
              </span>
              <br />
              <span className="font-semibold text-md">
                {
                  job.dropoffLocations[job.dropoffLocations.length - 1]
                    .streetname
                }
              </span>
            </p>
          </section>

          <section className="flex justify-between px-2">
            <p>Complete by</p>
            <p>
              {job.dropoffDate} {job.dropoffTime}
            </p>
          </section>
        </div>
      </div>
      <section className="flex items-center justify-center p-2 px-4 text-lg text-white bg-slate-600">
        Tap to view details
      </section>
    </div>
  );
}

export default JobCard;
