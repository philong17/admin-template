import { SVGProps } from 'react';

const AlertTriangleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M10.29 3.86L1.82 18A2 2 0 0 0 3.54 21H20.46A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <line x1={12} y1={9} x2={12} y2={13} stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' />
    <line x1={12} y1={17} x2={12.01} y2={17} stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' />
  </svg>
);

export default AlertTriangleIcon;
