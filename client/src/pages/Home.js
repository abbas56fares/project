import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HabitCard from "../components/HabitCard";
import "../styles/AddHabit.css";

function Home() {
  const [search, setSearch] = useState("");
  const [habits, setHabits] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newHabit, setNewHabit] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [currentHabit, setCurrentHabit] = useState(null);

  // Fetch user and habits on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchHabits(parsedUser.id);
  }, [navigate]);

  // Fetch habits from backend
  const fetchHabits = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/habits/${userId}`);
      const data = await response.json();
      
      if (response.ok) {
        setHabits(data);
      } else {
        console.error('Failed to fetch habits:', data.error);
      }
    } catch (error) {
      console.error('Error fetching habits:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = habits.filter((h) =>
    h.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddHabit = async () => {
    if (!newHabit.title.trim()) return alert("Title is required!");
    if (!user) return;

    try {
      const response = await fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          title: newHabit.title,
          description: newHabit.description,
          category: newHabit.category,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh habits list
        await fetchHabits(user.id);
        setNewHabit({ title: "", description: "", category: "" });
        setShowAddModal(false);
        alert('Habit created successfully!');
      } else {
        alert(data.error || 'Failed to create habit');
      }
    } catch (error) {
      console.error('Error creating habit:', error);
      alert('Connection error. Please make sure the server is running.');
    }
  };

  const handleDeleteHabit = async (id) => {
    if (!window.confirm('Are you sure you want to delete this habit?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/habits/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh habits list
        await fetchHabits(user.id);
        alert('Habit deleted successfully!');
      } else {
        alert(data.error || 'Failed to delete habit');
      }
    } catch (error) {
      console.error('Error deleting habit:', error);
      alert('Connection error. Please make sure the server is running.');
    }
  };

  
  const openEditModal = (habit) => {
    setCurrentHabit(habit);
    setShowEditModal(true);
  };


  const handleSaveEdit = async () => {
    if (!currentHabit || !user) return;

    try {
      const response = await fetch(`http://localhost:5000/api/habits/${currentHabit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: currentHabit.title,
          description: currentHabit.description,
          category: currentHabit.category,
          streak: currentHabit.streak,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh habits list
        await fetchHabits(user.id);
        setShowEditModal(false);
        alert('Habit updated successfully!');
      } else {
        alert(data.error || 'Failed to update habit');
      }
    } catch (error) {
      console.error('Error updating habit:', error);
      alert('Connection error. Please make sure the server is running.');
    }
  };

  if (loading) {
    return (
      <div className="background-gradient py-5 min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-white">
          <h3>Loading habits...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="background-gradient py-5">
      <div className="container">
       
        <header className="glass-hero p-4 mb-4 bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 style={{ color: "#764ba2" }}>HabitFlow</h1>
              <p className="lead text-black">
                Track your habits, build streaks, visualize progress
              </p>
              {user && <p className="text-muted">Welcome, {user.username}!</p>}
            </div>

            <button
              className="add-habit-btn"
              onClick={() => setShowAddModal(true)}
            >
              + Add Habit
            </button>
          </div>

          <input style={{ border: "grey solid 1px" }}
            type="text"
            className="form-control mt-3 text-black"
            placeholder="Search habits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        
        <div className="row">
          {filtered.length === 0 ? (
            <div className="col-12 text-center text-white mt-4">
              <h4>{habits.length === 0 ? 'No habits yet. Start by adding your first habit!' : 'No habits match your search.'}</h4>
            </div>
          ) : (
            filtered.map((habit) => (
              <div className="col-md-4" key={habit.id}>
                <HabitCard
                  habit={habit}
                  onDelete={handleDeleteHabit}
                  onEdit={openEditModal}
                />
              </div>
            ))
          )}
        </div>
      </div>

      
      {showAddModal && (
        <div className="habit-modal-overlay">
          <div className="habit-modal glass-card">
            <h3>Add Habit</h3>

            <input
              className="form-control mb-2"
              placeholder="Title"
              value={newHabit.title}
              onChange={(e) =>
                setNewHabit({ ...newHabit, title: e.target.value })
              }
            />

            <textarea
              className="form-control mb-2"
              placeholder="Description"
              value={newHabit.description}
              onChange={(e) =>
                setNewHabit({ ...newHabit, description: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Category"
              value={newHabit.category}
              onChange={(e) =>
                setNewHabit({ ...newHabit, category: e.target.value })
              }
            />

            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddHabit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      
      {showEditModal && currentHabit && (
        <div className="habit-modal-overlay">
          <div className="habit-modal glass-card">
            <h3>Edit Habit</h3>

            <input
              className="form-control mb-2"
              value={currentHabit.title}
              onChange={(e) =>
                setCurrentHabit({ ...currentHabit, title: e.target.value })
              }
            />

            <textarea
              className="form-control mb-2"
              value={currentHabit.description}
              onChange={(e) =>
                setCurrentHabit({
                  ...currentHabit,
                  description: e.target.value,
                })
              }
            />

            <input
              className="form-control mb-2"
              value={currentHabit.category}
              onChange={(e) =>
                setCurrentHabit({ ...currentHabit, category: e.target.value })
              }
            />

            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSaveEdit}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
