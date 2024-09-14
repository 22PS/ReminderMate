const EmailForm = () => {
  const fetchGmailEmails = () => {
    fetch('http://localhost:5000/api/emails/fetch-gmail').then((response) =>
      response.text()
    );
  };

  return (
    <div className="my-4">
      <button
        onClick={fetchGmailEmails}
        className="bg-blue-500 text-white px-6 py-2 rounded mt-8"
      >
        Click for new reminders !!
      </button>
    </div>
  );
};

export default EmailForm;
