"use client";

import React from "react";
import ContactImg from "../../../assets/image/aboutSection/aboutgirlIcon.svg";

const ContactForm: React.FC = () => {
  return (
    <section className="max-w-[1200px] mx-auto mt-16 px-4 sm:px-6">
      {/* Title */}
      <div className="border-b-2 border-black pb-4 mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">Contact</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Form Section */}
        <div className="flex-1 w-full md:w-auto">
          <div className="border-2 border-black bg-white shadow-[8px_8px_0_0_#000]">
            {/* Top Bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-black bg-gray-300">
              <span className="w-3 h-3 rounded-full border border-black bg-white" />
              <span className="w-3 h-3 rounded-full border border-black bg-white" />
              <span className="w-3 h-3 rounded-full border border-black bg-white" />
              <span className="ml-4 text-sm font-medium">contact.html</span>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                Say hi
              </h2>

              <p className="text-sm sm:text-base text-gray-700 max-w-full md:max-w-xl">
                Do you need a website for your business or want to collaborate
                with me on a project? Hit me up with a message below.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Your Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border-2 border-black bg-gray-300 px-3 py-2 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Your Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full border-2 border-black bg-gray-300 px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Message</label>
                  <textarea
                    placeholder="Your message"
                    rows={5}
                    className="w-full border-2 border-black bg-gray-300 px-3 py-2 resize-none focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="border-2 border-black px-6 py-2 font-semibold bg-white hover:bg-black hover:text-white transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* تصویر */}
        <div className="shrink-0 w-full md:w-[550px] flex justify-center mt-6 md:mt-0">
          <img
            src={ContactImg}
            alt="Contact Illustration"
            className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[550px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
