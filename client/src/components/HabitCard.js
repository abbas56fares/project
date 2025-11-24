import React from "react";
import "../styles/habitcard.css";
import { Link } from "react-router-dom";

function HabitCard({ habit, onDelete, onEdit }) {
  return (
    <div className="card glass-card mb-3">
      <div className="card-body">
        <h5 id="cards-title" className="card-title">
          {habit.title}
        </h5>

        <p className="card-subtitle text-muted">{habit.category}</p>
        <p className="card-text">{habit.description}</p>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="fw-bold">Streak: {habit.streak}</small>

          <div className="d-flex gap-2">
            <Link
              to={`/habit/${habit.id}`}
              className="btn btn-sm text-white"
              style={{ backgroundColor: "#764ba2" }}
            >
              View
            </Link>

            <button
              className="btn btn-sm btn-warning"
              onClick={() => onEdit(habit)}
            >
              Edit
            </button>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(habit.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabitCard;
