interface Props {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string; // رنگ جدید
}

const Loading: React.FC<Props> = ({ size = "lg", color = "#FF7959" }) => {
  return (
    <div className="flex items-center w-full h-full skeleton justify-center">
      <span
        className={`loading loading-infinity loading-${size}`}
        style={{ color }}
      ></span>
    </div>
  );
};

export default Loading;
