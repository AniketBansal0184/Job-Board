````markdown
# 💼 Job Listing Board – React Take-Home Assignment

A responsive React application where users can view, search, and save job listings from a mock API. This project demonstrates clean UI, optimized performance, global state management, and error/loading handling.

---

## 🚀 Features

- 🔍 **Real-time Search** – Filter jobs by title or company (with debounce)
- 📄 **Job Cards** – Display job title, company, and location
- 💾 **Save Jobs** – Save any job to view later in the Saved Jobs section
- 💬 **Global State** – Managed via React Context and Reducer
- 📱 **Responsive UI** – Mobile and desktop friendly
- 🛑 **Loading/Error States** – Smooth UX during data fetches

---

## 🧪 Tech Stack

- **React (Hooks)**
- **Context API + useReducer**
- **CSS (Grid + Flexbox)**
- **Debounce (custom or lodash)**
- **Mock API** (via static data or JSONPlaceholder)

---

## 🛠️ Setup Instructions

1. Clone the repo or unzip the project folder.
2. Navigate to the project directory:

   ```bash
   cd job-board
````

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

The app will run at: [http://localhost:3000](http://localhost:3000)

---

## 📖 Written Answers

### 1. React Hooks vs Class Components

React Hooks allow functional components to manage state and lifecycle logic without needing classes. Hooks like `useState`, `useEffect`, and `useContext` simplify component logic and make code more reusable and cleaner than class-based lifecycle methods.

### 2. Optimizing Long List Rendering

To improve performance when rendering hundreds of job cards, I’d use virtualization with a library like `react-window` to only render visible items. Also, I’d memoize job components and avoid unnecessary re-renders using `React.memo`.

### 3. Managing Form State and Validation

For small forms, I use `useState` along with simple validation logic. For larger or complex forms, I prefer using libraries like `Formik` or `React Hook Form` for better scalability, cleaner code, and built-in validation support.

---

## 🛠️ Debugging Fix

### Original Problem:

```jsx
function JobList({ jobs }) {
  const [search, setSearch] = useState('');
  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <ul>
        {jobs.map(job => (
          <li>{job.title} at {job.company}</li>
        ))}
      </ul>
    </div>
  );
}
```

### a. Issues:

* Missing `key` in list rendering
* No filtering applied to the job list based on search input

### b. Improved Code:

```jsx
function JobList({ jobs }) {
  const [search, setSearch] = useState('');

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search jobs..."
      />
      <ul>
        {filteredJobs.map(job => (
          <li key={job.id}>{job.title} at {job.company}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Explanation:

* Added a `key` to each job (`key={job.id}`) for React to track items efficiently.
* Filtered the jobs list based on search input to make search functional.

---

## ⚙️ Performance Answers

### a. Two techniques to improve job list rendering with 500+ items:

1. **Virtualization** using `react-window` or `react-virtualized` to render only visible jobs.
2. **Memoization** of individual job cards using `React.memo()` to prevent unnecessary re-renders.

### b. Avoiding unnecessary re-renders in job cards:

* Use `React.memo()` to memoize the `JobCard` component.
* Ensure props (like `job`) are stable using `useCallback` or avoid anonymous inline functions unless necessary.

```
