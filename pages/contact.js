import React, { useState } from "react";

function Contact() {
  const [nameValue, setNameValue] = useState("");
  function handleNameChange(event) {
    setNameValue(event.target.value);
  }
  const [subjectValue, setSubjectValue] = useState("");
  function handleSubjectChange(event) {
    setSubjectValue(event.target.value);
  }
  const [emailValue, setEmailValue] = useState("");
  function handleEmailChange(event) {
    setEmailValue(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:3000/api/email", {
      method: "POST",
      body: JSON.stringify({
        name: nameValue,
        subject: subjectValue,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // if (res.status === "success") {
        //   alert("It worked!");
        // } else {
        //   alert("Oh no...");
        // }
      });
  }
  return (
    <div className="container pr-3 pl-3">
      <h1 class="title is-4 mt-2">Contact Us</h1>
      <p className="block">
        Have a question? Don't hesitate to reach out to us using the below form!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="name">
            Full Name
          </label>
          <input
            className="input"
            type="text"
            id="name"
            value={nameValue}
            onChange={handleNameChange}
            required
          ></input>
        </div>
        <div className="field">
          <label className="label" htmlFor="email">
            Email Address
          </label>
          <input
            className="input"
            type="email"
            id="email"
            value={emailValue}
            onChange={handleEmailChange}
            required
          ></input>
        </div>
        <div className="field">
          <label className="label">Message</label>
          <textarea
            className="textarea"
            id="subject"
            name="subject"
            rows="10"
            value={subjectValue}
            onChange={handleSubjectChange}
            required
          ></textarea>
        </div>

        <input className="button is-info" type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Contact;
