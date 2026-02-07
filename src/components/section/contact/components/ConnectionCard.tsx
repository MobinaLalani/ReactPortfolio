"use client";

import React, { useState, useEffect } from "react";
import GmailIcon from "@/components/ui/icons/GmailIcon";
import LinkedinIcon from "@/components/ui/icons/linkedinIcon";
import PhoneIcon from "@/components/ui/icons/phoneIcon";

type LabelType = "linkedin" | "phone" | "gmail";

const CONNECTION_CONFIG: Record<
  LabelType,
  { icon: React.ReactNode; value: string }
> = {
  linkedin: {
    icon: <LinkedinIcon className="h-9 w-9" />,
    value:
      "https://www.linkedin.com/in/mobina-mohammadhoseinilalani-213632282/",
  },
  phone: {
    icon: <PhoneIcon className="h-9 w-9" />,
    value: "+98 919 375 8860",
  },
  gmail: {
    icon: <GmailIcon className="h-9 w-9" />,
    value: "mobinalalani529@gmail.com",
  },
};

type Props = {
  label: LabelType;
};

export default function ConnectionCard({ label }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CONNECTION_CONFIG[label].value);
    setCopied(true);
  };

  // بعد از 1.5 ثانیه tooltip محو بشه
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <button
      onClick={handleCopy}
      className="relative w-12 h-12 border-3 border-black flex items-center justify-center rounded-md
                 hover:bg-black transition-colors duration-300 group"
    >
      {/* Tooltip با انیمیشن */}
      <span
        className={`absolute -top-8 text-xs px-2 py-1 bg-black text-white rounded 
                    transition-all duration-300 ease-in-out
                    ${copied ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
      >
        Copied!
      </span>

      {/* Icon */}
      <span className="transition-colors duration-300 group-hover:text-white">
        {CONNECTION_CONFIG[label].icon}
      </span>
    </button>
  );
}
