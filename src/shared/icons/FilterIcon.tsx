import { SVGProps } from 'react';

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M3 6H10' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' />
    <path d='M3 12H12' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' />
    <path d='M19 12H21' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' />
    <path d='M14 6L21 6' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' />
    <path d='M13 18H20' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' />
    <path d='M3 18H6' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' />
    <circle cx={8} cy={18} r={2} stroke='currentColor' strokeWidth={1.5} />
    <circle cx={17} cy={12} r={2} stroke='currentColor' strokeWidth={1.5} />
    <circle cx={12} cy={6} r={2} stroke='currentColor' strokeWidth={1.5} />
  </svg>
);

export default FilterIcon;
