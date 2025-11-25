import { SVGProps } from 'react';

const InfoCircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx={12} cy={12} r={10} stroke='currentColor' strokeWidth={1.5} />
    <path d='M12 16V12' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' />
    <path d='M12 8H12.01' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' />
  </svg>
);

export default InfoCircleIcon;
