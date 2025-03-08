import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const IconSwirl = (props: IProps) => {
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
        stroke="#F4F4F4"
        d="M31.699 8.77c-11.576 0-20.96 9.487-20.96 21.19 0 13.439 10.782 17.27 17.261 17.27 12.471 0 17.26-7.742 17.26-17.27 0-7.574-6.07-13.712-13.561-13.712S18.137 22.386 18.137 29.96c0 5.95 4.808 9.764 10.345 9.764 5.913 0 9.381-4.066 9.381-9.764 0-3.443-2.759-6.232-6.164-6.232-3.406 0-6.165 2.79-6.165 6.232"
        clipPath="url(#a)"
        strokeMiterlimit="10"
        strokeWidth="5.073"
      />
    </svg>
  );
};
