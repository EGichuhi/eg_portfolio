import { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  // State to store form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    emailjs
    .send(
      'service_na3b4wf', // Replace with your EmailJS service ID
      'template_2nwg3js', // Replace with your EmailJS template ID
      formData, // Form data
      '0SNuaG2e5ClvIb1n4' // Replace with your EmailJS public key
    )
      .then(
        (response) => {
          console.log("Success!", response.status, response.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log("Failed...", error);
          alert("Failed to send message.");
        }
      );

    // Clear form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Input */}
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />

      {/* Email Input */}
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />

      {/* Message Input */}
      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      ></textarea>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-amber-700 text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-amber-600 hover:scale-[1.02] active:scale-95"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;

