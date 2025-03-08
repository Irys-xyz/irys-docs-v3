import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const IconShield = (props: IProps) => {
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
        d="M33.08 20.485c.98 1.06 1.62 2.4 1.8 3.91q.001.03.01.065t.01.065h4.25v-12.71L28 4.315l-11.16 7.5v12.71h4.26c.62-5.97 7.94-8.44 11.98-4.04m7.58 14.79v-23.11h6.53v27.46l-18.44 12.06v-8.62zm-5.77-9.26h4.27v8.45L28 41.765l-11.16-7.3v-8.45h4.26c.02.22.06.44.1.65a7.06 7.06 0 0 0 3.08 4.48c4.41 2.82 10.06-.07 10.61-5.13M8.81 12.165h6.53v23.11l11.91 7.79v8.62L8.81 39.625z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
};
