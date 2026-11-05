import { svgProps, type IconProps } from './IconProps';

const Forfeit = ({ size = 18 }: IconProps) => <svg {...svgProps(size)}><path d='M6 21V4' /><path d='M6 5c4-3 7 3 12 0v8c-5 3-8-3-12 0' /><path d='M4 21h4' /></svg>;

export default Forfeit;
