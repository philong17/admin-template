import { SVGProps } from 'react';

const MailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <rect x={2} y={3} width={20} height={18} rx={4} stroke='currentColor' strokeWidth={1.5} />
    <path
      d='M2 7L9.50122 13.001C10.9621 14.1697 13.0379 14.1697 14.4988 13.001L22 7'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default MailIcon;
