import React, { useState, useEffect } from 'react';
import EmailForm from './components/EmailForm';
import EmailList from './components/EmailList';

function App() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/emails')
      .then((res) => res.json())
      .then((data) => setEmails(data));
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Placement Reminder App</h1>
      <EmailForm />
      <EmailList emails={emails} />
    </div>
  );
}

export default App;
