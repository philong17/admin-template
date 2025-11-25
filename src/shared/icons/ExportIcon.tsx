import { SVGProps } from 'react';

const ExportIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={14} height={18} viewBox='0 0 14 18' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M7.875 3.4452V13.5H6.125V3.4452L3.28737 6.3639L2.05012 5.0913L7 0L11.9499 5.0913L10.7126 6.3639L7.875 3.4452ZM0 12.6H1.75V16.2H12.25V12.6H14V16.2C14 17.19 13.2125 18 12.25 18H1.75C0.7875 18 0 17.1333 0 16.2V12.6Z'
      fill='currentColor'
    />
  </svg>
);

export default ExportIcon;
