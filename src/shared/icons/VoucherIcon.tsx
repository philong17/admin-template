import { SVGProps } from 'react';

const VoucherIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M21 8.5C21 7.11929 19.8807 6 18.5 6H5.5C4.11929 6 3 7.11929 3 8.5V9.5C4.38071 9.5 5.5 10.6193 5.5 12C5.5 13.3807 4.38071 14.5 3 14.5V15.5C3 16.8807 4.11929 18 5.5 18H18.5C19.8807 18 21 16.8807 21 15.5V14.5C19.6193 14.5 18.5 13.3807 18.5 12C18.5 10.6193 19.6193 9.5 21 9.5V8.5Z'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M9 9L15 15M15 9L9 15' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export default VoucherIcon;
