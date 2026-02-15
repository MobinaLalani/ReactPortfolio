"use client";

import React from "react";
import ContactImg from "../../../assets/image/aboutSection/aboutgirlIcon.svg";
import { useContactForm } from "../../hooks/useContactForm";

const ContactForm: React.FC = () => {
  const {
    fullname,
    email,
    message,

    loading,
    response,
    error,

    setFullname,
    setEmail,
    setMessage,

    handleSubmit,
  } = useContactForm();

  const success = response?.status === "success";

  return (
    <section className="max-w-[1200px] mx-auto mt-16 px-4 sm:px-6">
      <div className="border-b-2 border-black pb-4 mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">Contact</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Form */}
        <div className="flex-1 w-full">
          <div className="border-2 border-black bg-white shadow-[8px_8px_0_0_#000]">
            <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-black bg-gray-300">
              <span className="w-3 h-3 rounded-full border border-black bg-white" />
              <span className="w-3 h-3 rounded-full border border-black bg-white" />
              <span className="w-3 h-3 rounded-full border border-black bg-white" />
              <span className="ml-4 text-sm font-medium">contact.html</span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                Say hi
              </h2>

              <p className="text-sm sm:text-base text-gray-700">
                Do you need a website for your business or want to collaborate
                with me on a project? Hit me up with a message below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Your Name</label>
                    <input
                      type="text"
                      name="fullname"
                      required
                      placeholder="Name"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      disabled={loading}
                      className="w-full border-2 border-black bg-gray-300 px-3 py-2 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="w-full border-2 border-black bg-gray-300 px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Message</label>
                  <textarea
                    name="message"
                    required
                    placeholder="Your message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    className="w-full border-2 border-black bg-gray-300 px-3 py-2 resize-none focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    border-2 border-black
                    px-6 py-2
                    font-semibold
                    bg-white
                    hover:bg-black hover:text-white
                    transition
                    disabled:opacity-50
                  "
                >
                  {loading ? "Sending..." : "Submit"}
                </button>

                {success && (
                  <p className="text-green-600 font-medium">
                    Message sent successfully ✅
                  </p>
                )}

                {error && <p className="text-red-600 font-medium">{error}</p>}
              </form>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="shrink-0 w-full md:w-[550px] flex justify-center">
          <img
            src={ContactImg}
            alt="Contact Illustration"
            className="w-full max-w-[400px] md:max-w-[550px]"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
