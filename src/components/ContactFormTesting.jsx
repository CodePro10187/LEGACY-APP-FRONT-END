import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function OtpSender() {
  const form = useRef();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  const getExpiryTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    return now.toLocaleTimeString();
  };

  const sendOtp = (e) => {
    e.preventDefault();
    const otp = generateOtp();
    const time = getExpiryTime();

    const templateParams = {
      to_email: email,
      passcode: otp,
      time: time,
    };

    emailjs
      .send(
        "service_zqw90bk",
        "template_lycp0qh",
        templateParams,
        "4zGWEA7HMRiT2Wod5"
      )
      .then(() => {
        alert("✅ OTP sent to your email");
        setOtpSent(true);
      })
      .catch((error) => {
        console.error("❌ Email send failed:", error);
        alert("Error sending OTP");
      });
  };

  return (
    <form ref={form} onSubmit={sendOtp}>
      <input
        type="email"
        name="to_email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send OTP</button>
      {otpSent && <p>Check your email for the OTP.</p>}
    </form>
  );
}
