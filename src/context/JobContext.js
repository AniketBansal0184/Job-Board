import { createContext, useReducer, useContext } from 'react';

const JobContext = createContext();

const initialState = {
  jobs: [],
  savedJobs: [],
  search: '',
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SAVE_JOB':
      return {
        ...state,
        savedJobs: [...state.savedJobs, action.payload],
      };
    default:
      return state;
  }
}

export function JobProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <JobContext.Provider value={{ state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
}

export const useJobContext = () => useContext(JobContext);
