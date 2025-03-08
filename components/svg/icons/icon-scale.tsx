import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const IconScale = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      fill="none"
      viewBox="0 0 56 56"
      {...props}
    >
      <path
        fill="#fff"
        d="M48.11 18.16c0 5.66-9.02 10.26-20.11 10.26S7.89 23.82 7.89 18.16 16.91 7.9 28 7.9s20.11 4.6 20.11 10.26M28 29.92c-11.85 0-20.11 3.13-20.11 5.93s8.26 5.93 20.11 5.93 20.11-3.13 20.11-5.93-8.26-5.93-20.11-5.93M7.95 45.69C8.96 46.71 16.38 48.1 28 48.1s19.05-1.39 20.05-2.41c-1.01-1.02-8.43-2.41-20.05-2.41S8.95 44.67 7.95 45.69"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
};
