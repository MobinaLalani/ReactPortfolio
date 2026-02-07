const GmailIcon = ({ className = ""}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
  >
    {/* Envelope body */}
    <path
      fill="currentColor"
      d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5V18a2 2 0 0 1-2 2h-2V9.4L12 14 6 9.4V20H4a2 2 0 0 1-2-2V6.5z"
    />
    {/* Envelope flap */}
    <path
      fill="currentColor"
      d="M12 12.3 2.8 6.1A2.5 2.5 0 0 1 4.5 4h15a2.5 2.5 0 0 1 1.7 2.1L12 12.3z"
    />
  </svg>
);

export default GmailIcon;
