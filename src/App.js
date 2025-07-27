import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JobProvider, useJobContext } from './context/JobContext';
import JobList from './components/JobList';
import SavedJobs from './components/SavedJobs';
import SearchBar from './components/SearchBar';
import './App.css';

function AppContent() {
  const { dispatch } = useJobContext();
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      dispatch({ type: 'SET_LOADING' });
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}`);
        const mockJobs = res.data.slice(0, 20).map((item, idx) => ({
          id: item.id,
          title: item.title,
          company: `Company ${idx + 1}`,
          location: ['Delhi', 'Bangalore', 'Remote', 'Pune'][idx % 4],
        }));
        dispatch({ type: 'SET_JOBS', payload: mockJobs });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch jobs' });
      }
    };

    fetchJobs();
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Job Board</h1>
      <SearchBar />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button onClick={() => setShowSaved(!showSaved)}>
          {showSaved ? 'Hide Saved Jobs' : 'Show Saved Jobs'}
        </button>
      </div>
      {showSaved ? <SavedJobs /> : <JobList />}
    </div>
  );
}

function App() {
  return (
    <JobProvider>
      <AppContent />
    </JobProvider>
  );
}

export default App;
