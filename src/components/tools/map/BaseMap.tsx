import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const BaseMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      // ایجاد نقشه با مرکزیت تهران
      const map = L.map(mapRef.current, {
        attributionControl: false, // غیرفعال کردن کپی رایت پایین نقشه
      }).setView([35.6895, 51.389], 13); // مختصات تهران

      // اضافه کردن لایه CartoDB
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        {
          attribution: "", // حذف متن کپی رایت
        }
      ).addTo(map);
    }
  }, []);

  return (
    <div
      // data-aos={'fade'}
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
    
    />
  );
};

export default BaseMap;
