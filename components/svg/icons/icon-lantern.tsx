import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const IconLantern = (props: IProps) => {
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
        d="M56 53.715H0v3.45h56zM42.862 43.067H13.136v3.284h29.725zm-6.322 5.235H19.46v3.284h17.08zM16.504 16.331V40.8h22.992V16.331zm18.393 21.185H21.102V19.287h13.795zm12.645-24.498C39.69 11.682 32.92 9.326 28 6.302c-4.92 3.024-11.69 5.38-19.542 6.716v1.229h39.084zM28 4.585c1.156 0 2.093-.84 2.093-1.875S29.156.835 28 .835s-2.093.84-2.093 1.875.937 1.875 2.093 1.875"
      />
    </svg>
  );
};
