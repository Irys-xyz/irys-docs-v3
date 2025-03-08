import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const IconShuriken = (props: IProps) => {
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
        d="M32.677 18.059 18.059 4v19.321L4 37.941h19.321L37.939 52V32.677l14.059-14.618H32.675zM28 30.906A2.904 2.904 0 0 1 25.094 28c0-1.606 1.3-2.906 2.906-2.906s2.906 1.3 2.906 2.906-1.3 2.906-2.906 2.906"
        clipPath="url(#a)"
      />
    </svg>
  );
};
