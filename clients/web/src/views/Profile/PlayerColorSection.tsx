import * as React from 'react';
import { useMutation } from 'react-relay';
import { PlayerColorPreviewContext } from '~/layout/Authenticated/PlayerColorPreviewContext';
import Mutation from '~/autogen/relay/ProfileUpdateMutation.graphql';
import type { ProfileUpdateMutation } from '~/autogen/relay/ProfileUpdateMutation.graphql';
import PlayerColorPicker from './PlayerColorPicker';
import EditableField from '~/components/EditableField';
import styles from './index.module.css';

const PlayerColorSection = ({ savedColor }: { savedColor: string }) => {
  const [editing, setEditing] = React.useState(false);
  const [error, setError] = React.useState('');
  const [commit] = useMutation<ProfileUpdateMutation>(Mutation);
  const pending = React.useRef(false);
  const desired = React.useRef(savedColor);
  const persisted = React.useRef(savedColor);
  const { color, setColor } = React.useContext(PlayerColorPreviewContext);
  React.useEffect(() => () => setColor(undefined), [setColor]);

  React.useEffect(() => {
    if (!pending.current) persisted.current = savedColor;
  }, [savedColor]);

  // Serialize writes while keeping selection responsive; a newer choice replaces the queued one.
  const persist = (value: string) => {
    pending.current = true;
    const complete = (message = '') => {
      pending.current = false;
      if (!message) persisted.current = value;
      if (desired.current !== value && desired.current !== persisted.current) {
        persist(desired.current);
      } else {
        setColor(undefined);
        setError(desired.current === value ? message : '');
      }
    };
    commit({
      variables: { q: { color: value } },
      onCompleted: (_, errors) => complete(errors?.[0]?.message),
      onError: error => complete(error.message),
    });
  };
  const chooseColor = (value: string) => {
    if (value === (pending.current ? desired.current : persisted.current)) return;
    desired.current = value;
    setColor(value);
    setError('');
    if (!pending.current) persist(value);
  };

  return <EditableField label='Color' caption='For theming and pieces'
    adornment={<span className={styles.colorDot} style={{ backgroundColor: color ?? savedColor }} aria-hidden='true' />}
    editing={editing} onEdit={() => setEditing(true)} onClose={() => setEditing(false)}
    error={error}>
    <PlayerColorPicker color={color ?? savedColor} onChange={chooseColor} onClose={() => setEditing(false)} />
  </EditableField>;
};
export default PlayerColorSection;
