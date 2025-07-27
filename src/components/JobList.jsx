import React from "react";
import { useJobContext } from "../context/JobContext";
import JobCard from "./JobCard";

function JobList() {
  const { state } = useJobContext();
  const { jobs, search, loading, error } = state;

  const filtered = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search)
  );

  if (loading) {
    return <div className="status loading">Fetching jobs, please wait...</div>;
  }

  if (error) {
    return <div className="status error">⚠️ {error}</div>;
  }

  return (
    <div className="job-list">
      {filtered.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
