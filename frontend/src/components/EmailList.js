const EmailList = ({ emails }) => {
  const formattedDate = (day) => {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
  };
  const formattedTime = (hours) => {
    const time = hours > 12 ? hours - 12 + ' PM' : hours + ' AM';
    return time;
  };
  return (
    <ul className="mt-4">
      {emails.length > 0 ? (
        emails.map((email, index) => (
          <li key={index} className="mb-2 p-4 bg-gray-100 rounded">
            <p>
              <strong>Company:</strong> {email.companyName}
            </p>

            <p>
              <strong>Date: </strong> {formattedDate(email.numDate)}
            </p>
            <p>
              <strong>Time: </strong>
              {formattedTime(email.hours)}
            </p>
          </li>
        ))
      ) : (
        <p>Nothing to Display!!</p>
      )}
    </ul>
  );
};

export default EmailList;
