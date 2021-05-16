import React, { useState } from 'react';

function ContactForm() {
  const [nameValue, setNameValue] = useState('');
  function handleNameChange(event) {
    setNameValue(event.target.value);
  }
  const [subjectValue, setSubjectValue] = useState('');
  function handleSubjectChange(event) {
    setSubjectValue(event.target.value);
  }
  const [emailValue, setEmailValue] = useState('');
  function handleEmailChange(event) {
    setEmailValue(event.target.value);
  }
  const [APIresponse, setAPIResponse] = useState('');
  function handleSubmit(event) {
    event.preventDefault();

    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({
        name: nameValue,
        subject: subjectValue,
        email: emailValue,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        const response = await res.json();
        setAPIResponse(response.status);
      });
  }
  let submitMessage = '';
  if (APIresponse === 'success') {
    submitMessage = 'Thank you for contacting us! We will be in touch.';
  } else if (APIresponse === 'error') {
    submitMessage = 'Something went wrong. Please try again later.';
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="name">
          Full Name
          <input
            className="input"
            type="text"
            id="name"
            value={nameValue}
            onChange={handleNameChange}
            required
          />
        </label>
      </div>
      <div className="field">
        <label className="label" htmlFor="email">
          Email Address
          <input
            className="input"
            type="email"
            id="email"
            value={emailValue}
            onChange={handleEmailChange}
            required
          />
        </label>
      </div>
      <div className="field">
        <label className="label" htmlFor="subject">
          Message
          <textarea
            className="textarea"
            id="subject"
            name="subject"
            rows="10"
            value={subjectValue}
            onChange={handleSubjectChange}
            required
          />
        </label>
      </div>
      <div className="is-flex is-align-items-center">
        <input disabled={APIresponse} className="button is-info mr-3" type="submit" value="Submit" />
        <p>{submitMessage}</p>
      </div>

    </form>
  );
}

export default ContactForm;
