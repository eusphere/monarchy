import shades from '../../../../../shared/player-colors.json';

// Each family representative is its fourth leaf; the same palette seeds new profiles.
export const playerColorFamilies = shades.map(colors => ({ color: colors[3], colors }));
