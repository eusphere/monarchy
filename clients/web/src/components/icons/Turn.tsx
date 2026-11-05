import { svgProps, type IconProps } from './IconProps';

const Turn = ({ size = 18 }: IconProps) => <svg {...svgProps(size)}><circle cx='12' cy='12' r='8' /><path d='m12 4 2 8-2 8-2-8 2-8Z' /><path d='M4 12h16' /></svg>;

export default Turn;
