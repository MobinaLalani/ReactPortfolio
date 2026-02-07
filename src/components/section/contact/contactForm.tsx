import React from "react";
import Image from "next/image";
import ContactImg from "../../../../public/image/aboutSection/aboutgirlIcon.svg";

const ContactForm: React.FC = () => {
  return (
    <section className="max-w-360 mx-auto mt-16 px-4">
      {/* عنوان بالا */}
      <div className="border-b-2 pb-4 mb-12 text-center">
        <h1 className="text-7xl font-bold">Contact</h1>
      </div>

      {/* محتوا: فرم + تصویر */}
      <div className="flex justify-between items-start gap-10">
        {/* فرم */}
        <div className="flex-1 ">
          <div className="border-2 border-black bg-white shadow-[8px_8px_0_0_#000]">
            <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-black bg-gray-300">
              <span className="w-3 h-3 rounded-full border border-black bg-white" />
              <span className="w-3 h-3 rounded-full border border-black bg-white" />
              <span className="w-3 h-3 rounded-full border border-black bg-white" />
              <span className="ml-4 text-sm font-medium">contact.html</span>
            </div>

            <div className="p-8 space-y-6">
              <h2 className="text-4xl font-extrabold">Say hi</h2>

              <p className="text-sm text-gray-700 max-w-xl">
                Do you need a website for your business or want to collaborate
                with me on a project? Hit me up with a message below.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Your Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border-2 border-black bg-gray-300 px-3 py-2 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Your email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full border-2 border-black bg-gray-300 px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>

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
        <div className="shrink-0">
          <Image
            src={ContactImg}
            alt="Contact Illustration"
            width={550}
            height={550}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
