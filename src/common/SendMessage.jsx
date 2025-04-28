import React from "react";
import "./SendMessage.css"; // Make sure the styles are updated too

export default function SendMessage() {
  return (
    <div className="contact-form-container">
      <h2 className="contact-heading">Tell Us Your Thoughts</h2>
      <form className="contact-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Your message"
              required
            ></textarea>
          </div>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
