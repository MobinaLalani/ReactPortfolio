import React from "react";
import Image from "next/image";
import girlIcon from "../../../../public/image/heroSection/girlIcon.svg";

export default function HeroSectionIndex() {
  return (
    <section className="relative overflow-hidden xl:mx-auto mx-5  max-w-360 px-6 md:px-16 bg-white py-16 flex flex-col md:flex-row items-center gap-20 rounded-lg">
      {/* خطوط بالا */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background:
            "repeating-linear-gradient(to right, black 0, black 20px, transparent 20px, transparent 30px)",
        }}
      />
      {/* خطوط پایین */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "4px",
          background:
            "repeating-linear-gradient(to right, black 0, black 20px, transparent 20px, transparent 30px)",
        }}
      />
      {/* خطوط چپ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "4px",
          background:
            "repeating-linear-gradient(to bottom, black 0, black 20px, transparent 20px, transparent 30px)",
        }}
      />
      {/* خطوط راست */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "4px",
          background:
            "repeating-linear-gradient(to bottom, black 0, black 20px, transparent 20px, transparent 30px)",
        }}
      />

      {/* تصویر */}
      <div className="shrink-0">
        <Image
          src={girlIcon}
          alt="Hero Illustration"
          width={400}
          height={400}
          className="rounded-full"
        />
      </div>

      {/* متن */}
      <div className="flex flex-col max-w-xl text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Hi, I&apos;m Mobina
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
          Frontend Developer
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          I create beautiful, responsive, and user-friendly web interfaces. My
          goal is to turn ideas into engaging digital experiences.
        </p>
      </div>

    </section>
  );
}
