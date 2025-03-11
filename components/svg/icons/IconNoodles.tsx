import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const IconNoodles = (props: IProps) => {
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
        d="M49.462 7.073H35.748v2.508h13.714zM6.538 26.805h38.36v4.463H6.538zm7.972 22.122h23.722l4.413-16.249H9.674zm21.238-37.495h13.714v2.508H35.748zM25.154 7.073s-2.999 2.673 0 6.699c1.779 2.388.848 3.802-.13 5.288-1.052 1.597-2.158 3.276-.02 6.335h-6.46c-2.137-3.058-1.031-4.737.02-6.333.978-1.486 1.91-2.9.13-5.29-3-4.026 0-6.699 0-6.699zm8.397 6.699c-3-4.026 0-6.699 0-6.699H27.09s-3 2.673 0 6.699c1.78 2.39.849 3.804-.13 5.29-1.05 1.596-2.156 3.275-.02 6.333h6.46c-2.137-3.06-1.031-4.738.02-6.335.978-1.486 1.91-2.9.13-5.288"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
};
