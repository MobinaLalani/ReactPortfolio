function Mission({ strokeColor = "#6B7280", strokeWidth = 1.5 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
    >
      <path
        d="M1.5 15C1.5 12.6611 1.5 11.4917 2.03647 10.6379C2.31621 10.1927 2.69267 9.81621 3.13789 9.53647C3.99167 9 5.16111 9 7.5 9H15.5C17.8389 9 19.0083 9 19.8621 9.53647C20.3073 9.81621 20.6838 10.1927 20.9635 10.6379C21.5 11.4917 21.5 12.6611 21.5 15C21.5 17.3389 21.5 18.5083 20.9635 19.3621C20.6838 19.8073 20.3073 20.1838 19.8621 20.4635C19.0083 21 17.8389 21 15.5 21H7.5C5.16111 21 3.99167 21 3.13789 20.4635C2.69267 20.1838 2.31621 19.8073 2.03647 19.3621C1.5 18.5083 1.5 17.3389 1.5 15Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 9C19.5 7.59987 19.5 6.8998 19.2275 6.36502C18.9878 5.89462 18.6054 5.51217 18.135 5.27248C17.6002 5 16.9001 5 15.5 5H7.5C6.09987 5 5.3998 5 4.86502 5.27248C4.39462 5.51217 4.01217 5.89462 3.77248 6.36502C3.5 6.8998 3.5 7.59987 3.5 9"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 5C17.5 3.11438 17.5 2.17157 16.9142 1.58579C16.3284 1 15.3856 1 13.5 1H9.5C7.61438 1 6.67157 1 6.08579 1.58579C5.5 2.17157 5.5 3.11438 5.5 5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 13C14.5 14.1046 13.6046 15 12.5 15H10.5C9.39543 15 8.5 14.1046 8.5 13"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Mission;
