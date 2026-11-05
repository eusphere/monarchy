import { svgProps, type IconProps } from './IconProps';

const Cursor = ({ size = 18 }: IconProps) => <svg {...svgProps(size)}><path d='M19 3 5 12l6 2 2 6L19 3Z' /></svg>;

export default Cursor;
