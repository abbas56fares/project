import React from 'react';
import '../styles/about.css';
function About() {
  return (
    <div id='about' className="container my-4">
      <div className="glass-card p-4 bg-white">
        <h2>About HabitFlow</h2>
        <p>HabitFlow is a modern habit & productivity tracker built to help people form consistent routines through simple tracking and meaningful visual feedback.</p>
        <h5>Mission</h5>
        <p>Make habit tracking approachable and elegant — a tool you enjoy opening every day.</p>
        <h5>Vision</h5>
        <p>Future phases will include analytics charts, reminders, user accounts, and mobile experience. For this demo, everything runs locally.</p>
      </div>
    </div>
  );
}

export default About;
