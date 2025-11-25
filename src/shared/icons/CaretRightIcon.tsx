import { SVGProps } from 'react';

const CaretRightIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width={20} height={20} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.94296 14.6546C7.67342 14.439 7.62972 14.0457 7.84535 13.7762L10.8663 9.99994L7.84535 6.2237C7.62972 5.95416 7.67342 5.56086 7.94296 5.34523C8.2125 5.12959 8.60581 5.1733 8.82144 5.44283L12.1548 9.6095C12.3374 9.83776 12.3374 10.1621 12.1548 10.3904L8.82144 14.557C8.60581 14.8266 8.2125 14.8703 7.94296 14.6546Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default CaretRightIcon;
