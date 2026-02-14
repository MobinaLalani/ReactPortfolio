import ConnectionCard from "./components/ConnectionCard";

export default function ContactIndex() {
  return (
    <div
      className="
        flex flex-wrap
        justify-center items-center
        gap-4
        max-w-[360px] md:max-w-none
        mx-auto
        mt-4
      "
    >
      <ConnectionCard label="phone" />
      <ConnectionCard label="gmail" />
      <ConnectionCard label="linkedin" />
    </div>
  );
}
