import React from 'react';
import { useJobContext } from '../context/JobContext';

function SavedJobs() {
  const { state } = useJobContext();

  if (state.savedJobs.length === 0) {
    return <p>No jobs saved.</p>;
  }

  return (
    <div className="job-list">
      {state.savedJobs.map((job) => (
        <div className="job-card" key={job.id}>
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <span style={{ color: 'green', fontWeight: 500 }}>Saved</span>
        </div>
      ))}
    </div>
  );
}

export default SavedJobs;
