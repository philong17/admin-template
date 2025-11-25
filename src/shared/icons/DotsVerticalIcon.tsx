import { SVGProps } from 'react';

const DotsVerticalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx={12} cy={12} r={1} fill='currentColor' />
    <circle cx={12} cy={5} r={1} fill='currentColor' />
    <circle cx={12} cy={19} r={1} fill='currentColor' />
  </svg>
);

export default DotsVerticalIcon;
