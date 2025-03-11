import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const IconProof = (props: IProps) => {
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
        fill="#F4F4F4"
        d="M25.93 6h4.144v10.148h-4.145zm-9.782 17.003v-6.855h6.855v-4.144h-6.814a4.187 4.187 0 0 0-4.186 4.186v6.813zm23.704-6.855v6.855h4.145V16.19a4.187 4.187 0 0 0-4.186-4.187h-6.813v4.145zm0 23.707v-6.854h4.145v6.813A4.187 4.187 0 0 1 39.81 44h-6.813v-4.145zm-23.704-.003v-6.855h-4.145v6.813a4.187 4.187 0 0 0 4.186 4.186h6.814v-4.144zm13.926 0h-4.145V50h4.145zM6 25.93h10.148v4.145H6zm44 0H39.852v4.145H50zm-13.476-1.556a2.366 2.366 0 1 1-4.731 0 2.366 2.366 0 0 1 4.73 0M21.842 26.74a2.366 2.366 0 1 0 0-4.731 2.366 2.366 0 0 0 0 4.73m-2.675 4.67 2.93-2.93h.003c3.255 3.256 8.55 3.256 11.806 0l2.93 2.93A12.45 12.45 0 0 1 28 35.064c-3.2 0-6.398-1.217-8.834-3.653"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
};
