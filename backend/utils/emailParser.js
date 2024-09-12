const parseEmail = (emailText) => {
  const companyName = emailText.match(/^[^-]+/)[0];

  const time = emailText.match(/(?<=by\s)\d{1,2}\s[APM]{2}(?=\s*,|\s*on)/i);

  const date = emailText.match(/(?<=on\s)0*(\d+)/);

  const isRelevant = /Hiring|FT|Full Time|Intern/i.test(emailText);

  return {
    companyName,
    time: time ? time[0] : 'NA',
    date: date ? date[0] : 'NA',
    isRelevant,
  };
};

module.exports = { parseEmail };
