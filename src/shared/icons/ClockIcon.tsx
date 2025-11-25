import { SVGProps } from 'react';

const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' {...props}>
    <rect width={256} height={256} fill='none' />
    <circle
      cx={128}
      cy={128}
      r={96}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={16}
    />
    <polyline
      points='128 72 128 128 184 128'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={16}
    />
  </svg>
);

export default ClockIcon;
