import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import habitsData from "../data/habits";
import habitdetail from "../styles/habitdetail.css";

function HabitDetail() {
  const { id } = useParams();
  const habit = habitsData.find((h) => h.id === id);
  const [streak, setStreak] = useState(habit ? habit.streak : 0);

  if (!habit)
    return (
      <div className="container my-4 glass-card p-4 ">
        Habit not found. <Link to="/">Back</Link>
      </div>
    );

  const markComplete = () => setStreak(streak + 1);

  return (
    <div id="habitdetail" className="container my-4 glass-card p-4">
      <h2>{habit.title}</h2>
      <p className="text-muted">{habit.subtitle}</p>
      <p>{habit.description}</p>
      <p>
        <strong className="text-black">Frequency:</strong> {habit.frequency}
      </p>
      <p>
        <strong className="text-black">Current Streak:</strong> {streak}
      </p>
      <button className="btn btn-success me-2" onClick={markComplete}>
        Mark Complete Today
      </button>
      <Link
        to="/"
        className="btn btn-link btn btn-sm text-white"
        style={{ textDecoration: "none", backgroundColor: "#764ba2" }}
      >
        Back
      </Link>
      <h5 className="mt-3">
        <strong>History</strong>
      </h5>
      <ul>
        {habit.history.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  );
}

export default HabitDetail;
