import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const IconGraph = (props: IProps) => {
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
        fill="#F3F3F3"
        d="M28.745 20.79V4.76c12.51.4 22.57 10.67 22.57 23.24s-10.06 22.84-22.57 23.24V35.21c8.38-1.1 8.38-13.31 0-14.42m-17.95-8.49 11.24 11.2a7.3 7.3 0 0 0-1.52 3.75H4.685c.18-5.58 2.33-10.84 6.11-14.95m1.06-1.07 11.23 11.2a7.22 7.22 0 0 1 4.16-1.68V4.76a23.14 23.14 0 0 0-15.39 6.47m3.83 36.51c-1.37-.85-2.66-1.85-3.83-2.97h.01l11.23-11.2c.14.12.29.24.45.35zm4.83-18.99H4.685c.08 2.43.53 4.81 1.36 7.1l14.7-5.9c-.1-.37-.23-1.1-.23-1.2m.791 2.637c.183.327.363.65.73 1.113v.01l-11.24 11.2a23.1 23.1 0 0 1-4.2-6.46l14.69-5.9z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
};
