"use client";
import React, { useState, useRef } from "react";
import MicrophoneSvg from "../../../../components/icons/components/microphoneSvg";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function AddAddress() {
  const [addAddress, setAddAddress] = useState(false);
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  // 🎤 شروع ضبط صدا
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("مرورگر شما از ضبط صدا پشتیبانی نمی‌کند!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fa-IR";
    recognition.continuous = true;
    recognition.interimResults = false; // فقط نتیجه نهایی رو می‌گیریم

    let tempTranscript = "";
    setIsRecording(true);

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          tempTranscript += event.results[i][0].transcript + " ";
        }
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (tempTranscript.trim()) {
        // ✅ متن جدید به انتهای قبلی اضافه میشه
        setText((prev) =>
          prev ? prev + " " + tempTranscript.trim() : tempTranscript.trim()
        );
      }
    };

    recognition.onerror = (e: any) => {
      console.error("Speech error:", e);
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  // 🛑 توقف ضبط
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsRecording(false);
    }
  };

  const handleClear = () => setText("");

  return (
    <>
      {!addAddress && (
        <div className="w-full flex flex-row justify-between items-center bg-red-100 rounded-[12px] px-3 py-[6px]">
          <span className="font-semibold sm:text-sm">
            این مرسوله فاقد آدرس می‌باشد
          </span>
          <button
            onClick={() => setAddAddress(true)}
            className="bg-[#FF8669] px-4 py-1 text-white sm:text-sm font-semibold rounded-[12px]"
          >
            اضافه کردن آدرس
          </button>
        </div>
      )}

{addAddress && (
  <div className="mt-6 bg-gray-50 border border-gray-200 rounded-[12px] p-6 relative">
    {/* ❌ دکمه بستن */}
    <button
      onClick={() => setAddAddress(false)}
      className="absolute top-1 left-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
    >
      ×
    </button>

    {/* 🧾 فیلد نمایش متن آدرس */}
    <div className="form-control w-full mt-2">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative rounded-[13px] bg-[#FFF] border border-gray-300">
          <div className="w-full px-4 py-3 text-base text-[#6B7280] font-medium rounded-[12px] bg-[#FFF]">
            <span className="text-gray-400 sm:text-sm">
              {text || "آدرس"}
            </span>
          </div>

          {text && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
          )}
        </div>
      </div>
    </div>

    {/* 🎤 دکمه ضبط و دکمه ذخیره کنار هم */}
    <div className="flex justify-between items-center gap-3 mt-4">
<button
  onMouseDown={startListening}
  onMouseUp={stopListening}
  onTouchStart={startListening}
  onTouchEnd={stopListening}
  className={`flex-1 sm:text-sm py-2 rounded-[10px] text-white font-semibold transition-all flex justify-center items-center ${
    isRecording
      ? "bg-red-500 scale-105"
      : "bg-[#ff8669] hover:bg-[#ed7051]"
  }`}
  title="نگه دار برای ضبط صدا"
>
  <MicrophoneSvg />
</button>


      <button
        onClick={() => {
          console.log("آدرس نهایی:", text);
          setAddAddress(false);
        }}
        className="flex-1 bg-[#FF8669] hover:bg-[#ed7051] text-white py-2 sm:text-sm rounded-[10px] font-semibold"
      >
        ذخیره آدرس
      </button>
    </div>
  </div>
)}



    </>
  );
}
