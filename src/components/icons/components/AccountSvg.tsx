import React from "react";

const AccountSvg = ({ strokeColor = "#6B7280", strokeWidth = 1.5 }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="elements">
        <path
          id="Vector"
          d="M6.78256 16.1112C5.68218 16.743 2.79706 18.0331 4.55429 19.6474C5.41269 20.436 6.36872 21 7.57068 21H14.4293C15.6313 21 16.5873 20.436 17.4457 19.6474C19.2029 18.0331 16.3178 16.743 15.2174 16.1112C12.6371 14.6296 9.36292 14.6296 6.78256 16.1112Z"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Ellipse 1381"
          d="M14.5 9C14.5 10.933 12.933 12.5 11 12.5C9.067 12.5 7.5 10.933 7.5 9C7.5 7.067 9.067 5.5 11 5.5C12.933 5.5 14.5 7.067 14.5 9Z"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <path
          id="Vector_2"
          d="M1.854 15C1.30501 13.7664 1 12.401 1 10.9646C1 5.46129 5.47715 1 11 1C16.5228 1 21 5.46129 21 10.9646C21 12.401 20.695 13.7664 20.146 15"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default AccountSvg;
