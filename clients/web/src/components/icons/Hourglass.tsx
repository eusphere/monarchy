import { svgProps, type IconProps } from './IconProps';

const Hourglass = ({ size = 18 }: IconProps) => <svg {...svgProps(size)}><g transform='rotate(180 12 12)'><path d='M7 3h10M7 21h10M8 4c0 3 2 4 4 5 2-1 4-2 4-5M8 20c0-3 2-4 4-5 2 1 4 2 4 5' /><path d='M9.5 17h5' /></g></svg>;

export default Hourglass;
