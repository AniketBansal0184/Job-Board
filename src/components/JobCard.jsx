import React from 'react';
import { useJobContext } from '../context/JobContext';

function JobCard({ job }) {
  const { dispatch, state } = useJobContext();
  const isSaved = state.savedJobs.some((j) => j.id === job.id);

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>

      {isSaved ? (
        <div className="saved-label">Saved</div>
      ) : (
        <button onClick={() => dispatch({ type: 'SAVE_JOB', payload: job })}>
          Save Job
        </button>
      )}
    </div>
  );
}

export default JobCard;
