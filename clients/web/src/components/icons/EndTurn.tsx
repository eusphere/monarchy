import { svgProps, type IconProps } from './IconProps';

const EndTurn = ({ size = 18 }: IconProps) => <svg {...svgProps(size)}><g transform='translate(0 24) scale(1 -1)'><path d='M5 6v5a7 7 0 0 0 7 7h6' /><path d='m15 14 3 4-3 4' /></g></svg>;

export default EndTurn;
