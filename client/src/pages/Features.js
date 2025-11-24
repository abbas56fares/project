import React from 'react';

function Features() {
  const features = [
    { title: 'Habit Creation', text: 'Define title, frequency, and description.' },
    { title: 'Completion Tracking', text: 'Mark habits done for today and watch streaks grow.' },
    { title: 'History & Streaks', text: 'View all completion dates and streak counters.' },
    { title: 'Local Demo Mode', text: 'Frontend-only prototype using static data for demo.' }
  ];

  return (
    <div className="container my-4">
      <h2 className='text-white'>Features</h2>
      <div className="row">
        {features.map((f,i) => (
          <div className="col-md-6" key={i}>
            <div className="glass-card p-3 mb-3 bg-white">
              <h5 className="fw-bold" style={{color: "#764ba2"}}>{f.title}</h5>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
