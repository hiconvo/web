import React from "react";

export default function Logo({ width, height = "auto" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 136 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="136" height="136" rx="50" fill="#00D4B5" />
      <rect width="136" height="136" rx="50" fill="url(#paint0_linear)" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="-343.066"
          y1="-564.5"
          x2="247.897"
          y2="-452.048"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
