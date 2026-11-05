import { svgProps, type IconProps } from './IconProps';

const Victory = ({ size = 18 }: IconProps) => <svg {...svgProps(size)}><path d='m3 6 4 4 3-6 2 6 2-6 3 6 4-4-2 12H5L3 6Z' /><path d='M5 18h14M7 21h10' /></svg>;

export default Victory;
