// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const res = await axios.get('http://localhost:3000/habits');
    setHabits(res.data);
  };

  const addHabit = async () => {
    if (!newHabit.trim()) return;
    const res = await axios.post('http://localhost:3000/habits', { name: newHabit });
    setHabits([...habits, res.data]);
    setNewHabit('');
  };

  const markComplete = async (id) => {
    await axios.post(`http://localhost:3000/habits/${id}/complete`);
    alert('Habit marked as complete');
  };

  const getHistory = async (id) => {
    const res = await axios.get(`http://localhost:3000/habits/${id}/history`);
    setSelectedHabit(id);
    setHistory(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Habit Tracker</h1>
      <input
        type="text"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="New Habit"
      />
      <button onClick={addHabit}>Add Habit</button>

      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name}{' '}
            <button onClick={() => markComplete(habit.id)}>Complete</button>{' '}
            <button onClick={() => getHistory(habit.id)}>View History</button>
          </li>
        ))}
      </ul>

      {selectedHabit && (
        <div>
          <h2>History for Habit ID {selectedHabit}</h2>
          <ul>
            {history.map((entry, idx) => (
              <li key={idx}>{entry.completed_on}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
