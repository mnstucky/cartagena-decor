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
  function handleSubmit(event) {
    event.preventDefault();

    fetch(`${process.env.NEXTAUTH_URL}/api/email`, {
      method: 'POST',
      body: JSON.stringify({
        name: nameValue,
        subject: subjectValue,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json());
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

      <input className="button is-info" type="submit" value="Submit" />
    </form>
  );
}

export default ContactForm;
