import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const IconPaperCrane = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="58"
      fill="none"
      viewBox="0 0 56 58"
      {...props}
    >
      <path
        fill="#fff"
        d="m41.505 9.51 6.04-5.935L56 21.65zm-.919 1.152 4.214 3.736-3.16 42.635h-1.896l-5.582-17.526zm4.39 28.625-.946 10.768 2.032 1.648L56 47.473l-4.283-4.89zm-12.2 3.406 4.667 14.34H10.65v-3.956zm-.494-1.919L9.992 51.597.274 53.135l10.376-9.229zm-21.028 1.29 21.028-3.133 1.208-5.218-9.443-4.89-10.212 7.086zm2.086-7.911 9.334-6.54L8.071 3.056 0 .967l5.16 5.77z"
      />
    </svg>
  );
};
