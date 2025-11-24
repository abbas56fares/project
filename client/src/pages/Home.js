import React, { useState } from "react";
import HabitCard from "../components/HabitCard";
import habitsData from "../data/habits";

function Home() {
  const [search, setSearch] = useState("");

  const filtered = habitsData.filter((h) =>
    h.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="background-gradient py-5">
      <div className="container">
        <header className="glass-hero p-4 mb-4 bg-white">
          <h1 style={{color: "#764ba2"}}>HabitFlow</h1>
          <p className="lead text-black">
            Track your habits, build streaks, visualize progress
          </p>
          <input style={{ border: "grey solid 1px"}}
            type="text"
            className="form-control"
            placeholder="Search habits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        <div className="row">
          {filtered.map((h) => (
            <div className="col-md-4" key={h.id}>
              <HabitCard habit={h} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
