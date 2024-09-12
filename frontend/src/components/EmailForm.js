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
        className="bg-blue-500 text-white px-4 py-2"
      >
        Fetch Emails from Gmail
      </button>
    </div>
  );
};

export default EmailForm;
