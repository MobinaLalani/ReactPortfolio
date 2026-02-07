import ConnectionCard from "./components/ConnectionCard";

export default function ContactIndex() {
  return (
    <div className="flex gap-4 max-w-360 m-auto mt-4">
      <ConnectionCard label="phone" />
      <ConnectionCard label="gmail" />
      {/* <ConnectionCard label="twitter" />
      <ConnectionCard label="discord" /> */}
      <ConnectionCard label="linkedin" />
    </div>
  );
}
