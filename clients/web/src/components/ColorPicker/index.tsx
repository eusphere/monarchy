import { useEffect, useId, useRef } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { colorForeground } from '~/components/PlayerAvatar/colorForeground';
import styles from './index.module.css';

type Color = { color: string; name: string };
type Family = Color & { colors: ReadonlyArray<Color> };
type Props = {
  families: ReadonlyArray<Family>;
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
  label?: string;
  autoFocus?: boolean;
};

const ColorPicker = ({ families, value, onChange, disabled = false, label = 'Player color', autoFocus = false }: Props) => {
  const id = useId();
  const familyButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const shadeButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const familyIndex = families.findIndex(family => family.colors.some(shade => shade.color === value));
  const activeFamily = Math.max(0, familyIndex);
  const family = families[activeFamily];
  const shadeIndex = family?.colors.findIndex(shade => shade.color === value) ?? -1;
  const activeShade = shadeIndex < 0 ? Math.max(0, family?.colors.findIndex(shade => shade.color === family.color) ?? 0) : shadeIndex;

  useEffect(() => {
    if (autoFocus) familyButtons.current.find(button => button?.tabIndex === 0)?.focus({ preventScroll: true });
  }, [autoFocus]);

  if (!family) return null;

  const navigate = (event: KeyboardEvent<HTMLButtonElement>, row: 'families' | 'shades', index: number) => {
    const options = row === 'families' ? families : family.colors;
    if ((event.key === 'ArrowDown' && row === 'families') || (event.key === 'ArrowUp' && row === 'shades')) {
      event.preventDefault();
      (row === 'families' ? shadeButtons.current[activeShade] : familyButtons.current[activeFamily])?.focus();
      return;
    }
    const delta = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 :
      delta === undefined ? undefined : (index + delta + options.length) % options.length;
    if (next === undefined) return;
    event.preventDefault();
    onChange(options[next].color);
    (row === 'families' ? familyButtons : shadeButtons).current[next]?.focus();
  };

  return <div className={styles.root} style={{
    '--picker-family': activeFamily,
    '--picker-shade': activeShade,
    '--picker-color': value,
  } as CSSProperties}>
    <span id={id} className={styles.srOnly}>Choose a family, then a shade. Arrow keys move between colors; up and down move between rows. Every selection saves a color.</span>
    <div className={styles.row} role='radiogroup' aria-label={`${label} families`} aria-describedby={id}>
      {families.map((option, index) => <button key={option.name}
        ref={node => { familyButtons.current[index] = node; }}
        type='button' role='radio' aria-label={option.name} aria-checked={familyIndex === index}
        tabIndex={index === activeFamily ? 0 : -1} disabled={disabled} title={option.name}
        className={styles.swatch} style={{ backgroundColor: option.color }}
        onClick={() => onChange(option.color)} onKeyDown={event => navigate(event, 'families', index)}>
      </button>)}
    </div>
    <div className={styles.connection} aria-hidden='true' data-visible={familyIndex >= 0} data-forward={activeFamily <= activeShade}>
      <span className={styles.sourceCurve} /><span className={styles.targetCurve} />
    </div>
    <div className={styles.row} role='radiogroup' aria-label={`${family.name} shades`}>
      {family.colors.map((option, index) => <button key={index}
        ref={node => { shadeButtons.current[index] = node; }}
        type='button' role='radio' aria-label={option.name} aria-checked={shadeIndex === index}
        tabIndex={index === activeShade ? 0 : -1} disabled={disabled} title={option.name}
        className={styles.swatch} style={{ backgroundColor: option.color, color: colorForeground(option.color) }}
        onClick={() => onChange(option.color)} onKeyDown={event => navigate(event, 'shades', index)}>
        <span className={styles.check} aria-hidden='true'>✓</span>
      </button>)}
    </div>
  </div>;
};

export default ColorPicker;
