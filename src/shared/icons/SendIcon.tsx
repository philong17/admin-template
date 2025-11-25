import { SVGProps } from 'react';

const SendIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default SendIcon;
