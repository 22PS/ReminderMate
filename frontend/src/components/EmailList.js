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
    <div className="flex max-w-md w-full rounded-lg shadow-md">
      {emails.length > 0 ? (
        emails.map((email) => (
          <div className="flex flex-col w-[100%] bg-blue-100 p-6 rounded-lg shadow-md justify-center items-center">
            <p className="text-[20px] font-bold mb-1">
              Company: {email.companyName}
            </p>
            <p className="text-[19px] font-semibold">
              Date:{' '}
              <span className="text-purple-700">
                {formattedDate(email.numDate)}
              </span>
            </p>
            <p className="text-[19px] font-semibold">
              Time:{' '}
              <span className="text-purple-700">
                {formattedTime(email.hours)}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Nothing to Display!!</p>
      )}
    </div>
  );
};

export default EmailList;
