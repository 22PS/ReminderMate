import React, { useState, useEffect } from 'react';
import EmailForm from './components/EmailForm';
import EmailList from './components/EmailList';
import './App.css';

function App() {
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 1;

  useEffect(() => {
    fetch('http://localhost:5000/api/emails')
      .then((res) => res.json())
      .then((data) => setEmails(data));
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentEmails = emails.slice(indexOfFirstCard, indexOfLastCard);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(emails.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => {
        if (prevPage >= pageNumbers.length) {
          return 1;
        } else {
          return prevPage + 1;
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [pageNumbers.length]);

  return (
    <div className="flex  justify-center min-h-screen bg-blue-50 p-4 ">
      <div className="flex flex-col max-w-[70%] justify-center items-center">
        <h1 className="text-3xl font-bold mb-8 text-center">
          ReminderMate - Your Placement Form Submission Reminder
        </h1>
        <div className="max-w-md w-full pt-8 p-6 mt-5 bg-white rounded-lg shadow-md">
          <EmailList emails={currentEmails} />
          <div className="flex space-x-4 mt-4 justify-center">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageClick(number)}
                className={`px-4 py-2 rounded ${
                  currentPage === number
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
        <div className="my-4">
          <EmailForm />
        </div>
      </div>
    </div>
  );
}

export default App;
