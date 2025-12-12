import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send message');
        return;
      }

      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name:'', email:'', message:'' });
    } catch (err) {
      setError('Connection error. Please make sure the server is running.');
    }
  };

  return (
    <div className="container my-4">
      <div className="glass-card p-4 bg-white">
        <h2 style={{ color: '#764ba2' }}>Contact</h2>
        <p>Send us your feedback or questions.</p>
        {sent && <div className="alert alert-success">Message sent successfully!</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input style={{ border: "grey solid 1px", color: "black" }} type="text" className="form-control mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input style={{ border: "grey solid 1px", color: "black" }} type="email" className="form-control mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <textarea style={{ border: "grey solid 1px", color: "black" }} className="form-control mb-2" rows="5" placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required />
          <button className="btn text-white" style={{ backgroundColor: '#764ba2' }} type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
