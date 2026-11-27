import { useEffect, useId, useRef } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { colorForeground } from '~/components/PlayerAvatar/colorForeground';
import styles from './index.module.css';

type Family = { color: string; colors: ReadonlyArray<string> };
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
  const familyIndex = families.findIndex(family => family.colors.includes(value));
  const activeFamily = Math.max(0, familyIndex);
  const family = families[activeFamily];
  const shadeIndex = family?.colors.indexOf(value) ?? -1;
  const activeShade = shadeIndex < 0 ? Math.max(0, family?.colors.indexOf(family.color) ?? 0) : shadeIndex;

  useEffect(() => {
    if (autoFocus) familyButtons.current.find(button => button?.tabIndex === 0)?.focus({ preventScroll: true });
  }, [autoFocus]);

  if (!family) return null;

  const navigate = (event: KeyboardEvent<HTMLButtonElement>, row: 'families' | 'shades', index: number) => {
    const count = row === 'families' ? families.length : family.colors.length;
    if ((event.key === 'ArrowDown' && row === 'families') || (event.key === 'ArrowUp' && row === 'shades')) {
      event.preventDefault();
      (row === 'families' ? shadeButtons.current[activeShade] : familyButtons.current[activeFamily])?.focus();
      return;
    }
    const delta = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 :
      delta === undefined ? undefined : (index + delta + count) % count;
    if (next === undefined) return;
    event.preventDefault();
    onChange(row === 'families' ? families[next].color : family.colors[next]);
    (row === 'families' ? familyButtons : shadeButtons).current[next]?.focus();
  };

  return <div className={styles.root} style={{
    '--picker-family': activeFamily,
    '--picker-shade': activeShade,
    '--picker-color': value,
  } as CSSProperties}>
    <span id={id} className={styles.srOnly}>Choose a family, then a shade. Arrow keys move between colors; up and down move between rows. Every selection saves a color.</span>
    <div className={styles.row} role='radiogroup' aria-label={`${label} families`} aria-describedby={id}>
      {families.map((option, index) => <button key={option.color}
        ref={node => { familyButtons.current[index] = node; }}
        type='button' role='radio' aria-label={`Color family ${index + 1}`} aria-checked={familyIndex === index}
        tabIndex={index === activeFamily ? 0 : -1} disabled={disabled}
        className={styles.swatch} style={{ backgroundColor: option.color }}
        onClick={() => onChange(option.color)} onKeyDown={event => navigate(event, 'families', index)}>
      </button>)}
    </div>
    <div className={styles.connection} aria-hidden='true' data-visible={familyIndex >= 0} data-forward={activeFamily <= activeShade}>
      <span className={styles.sourceCurve} /><span className={styles.targetCurve} />
    </div>
    <div className={styles.row} role='radiogroup' aria-label={`Color family ${activeFamily + 1} shades`}>
      {family.colors.map((option, index) => <button key={index}
        ref={node => { shadeButtons.current[index] = node; }}
        type='button' role='radio' aria-label={`Shade ${index + 1}`} aria-checked={shadeIndex === index}
        tabIndex={index === activeShade ? 0 : -1} disabled={disabled}
        className={styles.swatch} style={{ backgroundColor: option, color: colorForeground(option) }}
        onClick={() => onChange(option)} onKeyDown={event => navigate(event, 'shades', index)}>
        <span className={styles.check} aria-hidden='true'>✓</span>
      </button>)}
    </div>
  </div>;
};

export default ColorPicker;
