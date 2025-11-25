import { SVGProps } from 'react';

const PricingToolsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z'
      stroke='currentColor'
      strokeWidth={1.5}
    />
    <path
      d='M9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5C14.5 9.88071 13.3807 11 12 11C10.6193 11 9.5 12.1193 9.5 13.5C9.5 14.8807 10.6193 16 12 16C13.3807 16 14.5 14.8807 14.5 13.5'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
    />
    <path d='M12 4V6M12 16V18' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' />
  </svg>
);

export default PricingToolsIcon;
