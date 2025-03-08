import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const IconSpiritGate = (props: IProps) => {
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
        d="M47.007 9.224H42.16v3.868H30.905V9.527h-5.812v3.565h-11.28V9.224H8.966v3.868H4.46v4.2h4.506V45.2H7.91v10.786h6.985V45.2h-1.082V17.291H42.16v27.91h-1.056v10.785h6.983V45.2h-1.08V17.291h4.532v-4.199h-4.532zM28 3.282C16.423 3.282 6.191 1.99 0 .014l4.255 7.562h47.49L56 .014c-6.194 1.978-16.426 3.268-28 3.268"
      />
    </svg>
  );
};
