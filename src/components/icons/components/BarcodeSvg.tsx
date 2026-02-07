import React from "react";

const BarcodeSvg = ({ strokeColor = "#6B7280", strokeWidth = 1.5 }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="elements">
        <path
          id="Rectangle 17706"
          d="M1.5 4C1.5 2.58579 1.5 1.87868 1.93934 1.43934C2.37868 1 3.08579 1 4.5 1C5.91421 1 6.62132 1 7.06066 1.43934C7.5 1.87868 7.5 2.58579 7.5 4C7.5 5.41421 7.5 6.12132 7.06066 6.56066C6.62132 7 5.91421 7 4.5 7C3.08579 7 2.37868 7 1.93934 6.56066C1.5 6.12132 1.5 5.41421 1.5 4Z"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          id="Rectangle 17708"
          d="M1.5 16C1.5 14.5858 1.5 13.8787 1.93934 13.4393C2.37868 13 3.08579 13 4.5 13C5.91421 13 6.62132 13 7.06066 13.4393C7.5 13.8787 7.5 14.5858 7.5 16C7.5 17.4142 7.5 18.1213 7.06066 18.5607C6.62132 19 5.91421 19 4.5 19C3.08579 19 2.37868 19 1.93934 18.5607C1.5 18.1213 1.5 17.4142 1.5 16Z"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          id="Vector 6601"
          d="M1.5 10L7.5 10"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector 6602"
          d="M10.5 1V6"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Rectangle 17707"
          d="M13.5 4C13.5 2.58579 13.5 1.87868 13.9393 1.43934C14.3787 1 15.0858 1 16.5 1C17.9142 1 18.6213 1 19.0607 1.43934C19.5 1.87868 19.5 2.58579 19.5 4C19.5 5.41421 19.5 6.12132 19.0607 6.56066C18.6213 7 17.9142 7 16.5 7C15.0858 7 14.3787 7 13.9393 6.56066C13.5 6.12132 13.5 5.41421 13.5 4Z"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          id="Vector"
          d="M19.5 10H13.5C12.0858 10 11.3787 10 10.9393 10.4393C10.5 10.8787 10.5 11.5858 10.5 13M10.5 15.7692V18.5385M13.5 13V14.5C13.5 15.9464 14.2837 16 15.5 16C16.0523 16 16.5 16.4477 16.5 17M14.5 19H13.5M16.5 13C17.9142 13 18.6213 13 19.0607 13.44C19.5 13.8799 19.5 14.5881 19.5 16.0043C19.5 17.4206 19.5 18.1287 19.0607 18.5687C18.74 18.8898 18.2767 18.9766 17.5 19"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default BarcodeSvg;
