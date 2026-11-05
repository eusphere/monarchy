import { svgProps, type IconProps } from './IconProps';

const Move = ({ size = 18 }: IconProps) => <svg {...svgProps(size)}><path d='M4 19 19 4' /><path d='M10 4h9v9' /><path d='M5 14v5h5' /></svg>;

export default Move;
