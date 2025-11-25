import { SVGProps } from 'react';

const CalendarCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M8 2V5' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' />
    <path d='M16 2V5' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' />
    <path
      d='M3 7.5C3 5.29086 4.79086 3.5 7 3.5H17C19.2091 3.5 21 5.29086 21 7.5V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V7.5Z'
      stroke='currentColor'
      strokeWidth={1.5}
    />
    <path
      d='M9 15L10.7528 16.4023C11.1707 16.7366 11.7777 16.6826 12.1301 16.2799L15 13'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M3 9H21' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' />
  </svg>
);
export default CalendarCheckIcon;
