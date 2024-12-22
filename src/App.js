import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table/Table";

const LINK_TO_API =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

const columns = [
  { headerName: "S.No.", field: "s.no" },
  { headerName: "Percentage Funded", field: "percentage.funded" },
  { headerName: "Amount Pledged", field: "amt.pledged" },
];

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortData = (data) => {
    return [...data].sort((a, b) => {
      if (a["percentage.funded"] < b["percentage.funded"]) {
        return 1;
      }
      if (a["percentage.funded"] > b["percentage.funded"]) {
        return -1;
      }
      return 0;
    });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(LINK_TO_API);
        if (response) {
          const data = await response.json();
          // const highlyRatedProjects = sortData(data);
          setProjects(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <Table
        data={projects}
        columns={columns}
        rowsPerPage={5}
      />
    </div>
  );
}

export default App;
