export const colorForeground = (hex: string): string => {
  const rgb = hex.replace('#', '').match(/.{2}/g)?.map(v => {
    const c = parseInt(v, 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return rgb && rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722 > .179 ? '#111111' : '#ffffff';
};
