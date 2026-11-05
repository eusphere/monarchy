import { svgProps, type IconProps } from './IconProps';

const Compass = ({ size = 18 }: IconProps) => <svg {...svgProps(size)}><circle cx='12' cy='12' r='8.5' /><path d='m15.5 8.5-2.25 4.75-4.75 2.25 2.25-4.75 4.75-2.25Z' /></svg>;

export default Compass;
