import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import habitdetail from "../styles/habitdetail.css";

function HabitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchHabit(parsedUser.id);
  }, [id, navigate]);

  const fetchHabit = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/habits/${userId}`);
      const habits = await response.json();
      
      if (response.ok) {
        const foundHabit = habits.find((h) => h.id === parseInt(id));
        setHabit(foundHabit);
      } else {
        console.error('Failed to fetch habits');
      }
    } catch (error) {
      console.error('Error fetching habit:', error);
    } finally {
      setLoading(false);
    }
  };

  const markComplete = async () => {
    if (!habit || !user) return;

    const newStreak = habit.streak + 1;
    
    try {
      const response = await fetch(`http://localhost:5000/api/habits/${habit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: habit.title,
          description: habit.description,
          category: habit.category,
          streak: newStreak,
        }),
      });

      if (response.ok) {
        setHabit({ ...habit, streak: newStreak });
        alert('Great job! Streak updated!');
      } else {
        alert('Failed to update streak');
      }
    } catch (error) {
      console.error('Error updating streak:', error);
      alert('Connection error. Please make sure the server is running.');
    }
  };

  const resetStreak = async () => {
    if (!habit || !user) return;

    try {
      const response = await fetch(`http://localhost:5000/api/habits/${habit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: habit.title,
          description: habit.description,
          category: habit.category,
          streak: 0,
        }),
      });

      if (response.ok) {
        setHabit({ ...habit, streak: 0 });
        alert('Streak has been reset to 0.');
      } else {
        alert('Failed to reset streak');
      }
    } catch (error) {
      console.error('Error resetting streak:', error);
      alert('Connection error. Please make sure the server is running.');
    }
  };

  if (loading) {
    return (
      <div className="container my-4 glass-card p-4 text-white">
        Loading habit details...
      </div>
    );
  }

  if (!habit)
    return (
      <div className="container my-4 glass-card p-4 text-white">
        Habit not found. <Link to="/" className="text-warning">Back to Home</Link>
      </div>
    );

  return (
    <div id="habitdetail" className="container my-4 glass-card p-4">
      <h2>{habit.title}</h2>
      <p className="text-muted">{habit.category}</p>
      <p>{habit.description}</p>
      <p>
        <strong className="text-black">Current Streak:</strong> {habit.streak} days
      </p>
      <button className="btn btn-success me-2" onClick={markComplete}>
        Mark Complete Today
      </button>
      <button className="btn btn-outline-danger me-2" onClick={resetStreak}>
        Reset Streak
      </button>
      <Link
        to="/"
        className="btn btn-link btn btn-sm text-white"
        style={{ textDecoration: "none", backgroundColor: "#764ba2" }}
      >
        Back
      </Link>
      <p className="mt-3 text-muted">Keep up the great work! Click "Mark Complete Today" to increase your streak.</p>
    </div>
  );
}

export default HabitDetail;
