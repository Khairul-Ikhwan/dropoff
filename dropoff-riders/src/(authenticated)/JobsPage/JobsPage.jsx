import JobCard from "./components/JobCard";
import { jobs } from "./sampledata.json";

function JobsPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-semibold">
        Available jobs{" "}
        <span className="text-lg font-normal">
          ({jobs && jobs.length} total)
        </span>
      </h1>
      <section className="flex flex-col gap-3">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>No jobs available at the moment.</p>
        )}
      </section>
    </div>
  );
}

export default JobsPage;
