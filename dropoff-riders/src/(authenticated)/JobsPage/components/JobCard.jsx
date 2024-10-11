import { format } from "date-fns";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function JobCard({ job }) {
  return (
    <div className="flex flex-col overflow-hidden border rounded-lg shadow-xl bg-sky-50 border-slate-500/25">
      <section className="flex items-center justify-between p-2 px-4 text-lg text-white bg-black">
        <p>{job.jobType}</p>
        <p>${job.deliveryPrice}</p>
      </section>
      <div className="flex flex-col justify-center h-40 p-3">
        <div className="flex flex-col gap-3 px-2">
          <section className="flex items-center justify-between px-2 bg-white border rounded-md border-slate-500">
            <p className="text-center font-lg">
              Pickup <br />
              <span className="font-semibold">{job.pickupLocation}</span>
            </p>
            <div>
              <MdOutlineKeyboardDoubleArrowRight />
            </div>
            <p className="text-center">
              Dropoff <br />
              <span className="font-semibold">{job.dropoffLocation}</span>
            </p>
          </section>

          <section className="flex justify-between p-2">
            <p>Complete by {""}</p>
            <p>
              {format(new Date(job.dropoffDate), "dd MMM yy")},{" "}
              {format(new Date("2023-01-01T" + job.dropoffTime), "h:mm a")}
            </p>
          </section>
        </div>
      </div>
      <section className="flex items-center justify-between p-2 px-4 text-lg text-white bg-slate-600">
        <p>{format(new Date(job.pickupDate), "dd MMM yy")}</p>
        <p>{format(new Date("2023-01-01T" + job.pickupTime), "h:mm a")}</p>
      </section>
    </div>
  );
}

export default JobCard;
