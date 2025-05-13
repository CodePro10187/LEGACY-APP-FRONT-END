import React from "react";
import "./HelpFAQ.css";
import { Link } from "react-router-dom";

const HelpFAQ = () => {
  return (
    <div
      className="help-faq-container"
      style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}
    >
      <h1>📘 Help & FAQ</h1>
      <p>
        Click here to return to <Link to="/">Home Page</Link>
      </p>

      <section>
        <h2>👥 Account & Login</h2>
        <p>
          <strong>Do I need to sign up to use the app?</strong>
          <br />
          Yes, even for free features, you need to <strong>sign up</strong> so
          we can recognize your account later.
        </p>
        <p>
          <strong>I forgot my security question. What should I do?</strong>
          <br />
          Please <strong>never forget your security question</strong>. It’s
          essential for account recovery and verification.
        </p>
      </section>

      <section>
        <h2>💼 Free vs Premium Features</h2>
        <p>
          <strong>What features are free?</strong>
          <br />
          Free users can:
        </p>
        <ul>
          <li>Plan their legacy</li>
          <li>Save and manage digital assets</li>
          <li>Share access with beneficiaries</li>
        </ul>

        <p>
          <strong>What are premium features?</strong>
          <br />
          Premium users can:
        </p>
        <ul>
          <li>Create official legal documents using templates</li>
          <li>Contact a verified lawyer</li>
          <li>Distribute wills and property with legal support</li>
        </ul>
      </section>

      <section>
        <h2>⚖️ Lawyers & Legal Help</h2>
        <p>
          <strong>Do I need a lawyer to submit a deceased certificate?</strong>
          <br />
          Yes, and free users are allowed one{" "}
          <strong>free lawyer assignment</strong> for this purpose. After that,
          you can use a <strong>one-time payment plan</strong>.
        </p>

        <p>
          <strong>
            Can beneficiaries submit the certificate without a lawyer?
          </strong>
          <br />
          Yes, but the process is slower due to potential fraud. We will:
        </p>
        <ul>
          <li>Notify all beneficiaries</li>
          <li>Notify the deceased person’s account</li>
          <li>Wait for a review period</li>
          <li>Send verification emails</li>
        </ul>

        <p>
          <strong>What documents must lawyers upload when registering?</strong>
          <br />
          All documents must be in <strong>PDF format</strong>:
        </p>
        <ul>
          <li>Government-issued Legal ID</li>
          <li>Valid Bar Association License</li>
          <li>Address & Contact Proof</li>
        </ul>

        <p>
          <strong>What else can lawyers do?</strong>
          <br />
        </p>
        <ul>
          <li>Verify and process deceased certificates</li>
          <li>Assist in asset distribution</li>
          <li>Provide consultation to premium users</li>
        </ul>
      </section>

      <section>
        <h2>🧾 Deceased Certificate & Reversal</h2>
        <p>
          <strong>
            Can I reverse a deceased account if it was a mistake or fraud?
          </strong>
          <br />
          Yes, but only by <strong>personally emailing</strong> our support
          team. We manually review such requests for safety.
        </p>
      </section>

      <section>
        <h2>🧑‍💼 Hiring & Verification</h2>
        <p>We’re hiring employees who will:</p>
        <ul>
          <li>Verify documents uploaded by lawyers</li>
          <li>Confirm the validity of deceased certificates</li>
          <li>Maintain security and authenticity of our legacy services</li>
        </ul>
      </section>
    </div>
  );
};

export default HelpFAQ;
