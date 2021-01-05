import React, {useState} from "react";
import styles from "./Contact.module.css";

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
        subject: subjectValue
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
    .then(res => {
      // if (res.status === "success") {
      //   alert("It worked!");
      // } else {
      //   alert("Oh no...");
      // }
    })
  }
  return (
    <div className="wrapper">
      <h2>Contact Us</h2>
      <p>
        Have a question? Don't hesitate to reach out to us using the below form!
      </p>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <label className={styles.nameLabel} htmlFor="name">
          Full Name
        </label>
        <input className={styles.nameInput} type="text" id="name" value={nameValue} onChange={handleNameChange} required></input>
        <label className={styles.emailLabel} htmlFor="email">
          Email Address
        </label>
        <input className={styles.emailInput} type="email" id="email" value={emailValue} onChange={handleEmailChange} required></input>
        <label className={styles.subjectLabel}> 
          Subject
        </label>
        <textarea id="subject" name="subject" rows="10" value={subjectValue} onChange={handleSubjectChange} required></textarea>
        <input className={styles.submitButton} type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Contact;
