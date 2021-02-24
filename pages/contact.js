import React from 'react';
import ContactForm from '../components/ContactForm';

function Contact() {
  return (
    <div className="container pr-3 pl-3">
      <h1 className="title is-4 mt-2">Contact Us</h1>
      <p className="block">
        Have a question? Don&apos;t hesitate to reach out to us using the below form!
      </p>
      <ContactForm />
    </div>
  );
}

export default Contact;
