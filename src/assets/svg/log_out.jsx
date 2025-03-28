import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={32} height={32} rx={9.6} fill="#EAEAEA" />
    <path
      d="M21.3034 10.4695C22.3523 11.537 23.0666 12.8971 23.356 14.3777C23.6454 15.8584 23.4969 17.3931 22.9292 18.7878C22.3616 20.1826 21.4003 21.3747 20.1669 22.2134C18.9335 23.0521 17.4835 23.4998 16.0001 23.4998C14.5168 23.4998 13.0667 23.0521 11.8334 22.2134C10.6 21.3747 9.63869 20.1826 9.07103 18.7878C8.50337 17.3931 8.35485 15.8584 8.64423 14.3777C8.93362 12.8971 9.64792 11.537 10.6968 10.4696M16.0001 8.49976V12.4393"
      stroke="#060606"
      strokeOpacity={0.5}
      strokeWidth={1.25}
      strokeLinecap="round"
    />
  </svg>
);
export default SVGComponent;
