import React, { useState } from "react";
import HabitCard from "../components/HabitCard";
import habitsData from "../data/habits";
import "../styles/AddHabit.css";

function Home() {
  const [search, setSearch] = useState("");
  const [habits, setHabits] = useState(habitsData);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newHabit, setNewHabit] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [currentHabit, setCurrentHabit] = useState(null);

  const filtered = habits.filter((h) =>
    h.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddHabit = () => {
    if (!newHabit.title.trim()) return alert("Title is required!");

    const habitObj = {
      id: habits.length + 1,
      ...newHabit,
      streak: 0,
    };

    setHabits([habitObj, ...habits]);
    setNewHabit({ title: "", description: "", category: "" });

    setShowAddModal(false);
  };

  const handleDeleteHabit = (id) => {
    const updated = habits.filter((h) => h.id !== id);
    setHabits(updated);
  };

  
  const openEditModal = (habit) => {
    setCurrentHabit(habit);
    setShowEditModal(true);
  };


  const handleSaveEdit = () => {
    const updated = habits.map((h) =>
      h.id === currentHabit.id ? currentHabit : h
    );
    setHabits(updated);
    setShowEditModal(false);
  };

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
          {filtered.map((habit) => (
            <div className="col-md-4" key={habit.id}>
              <HabitCard
                habit={habit}
                onDelete={handleDeleteHabit}
                onEdit={openEditModal}
              />
            </div>
          ))}
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
