import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';

type Props = {
  label: string;
  caption?: string;
  adornment?: ReactNode;
  editing: boolean;
  onEdit: () => void;
  onClose: () => void;
  children: ReactNode;
  status?: string;
  error?: string;
};

// Shared disclosure layout for profile properties; each editor owns its draft and save behavior.
const EditableField = ({ label, caption, adornment, editing, onEdit, onClose, children, status, error }: Props) => {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const wasEditing = useRef(editing);
  useEffect(() => {
    if (wasEditing.current && !editing) trigger.current?.focus({ preventScroll: true });
    wasEditing.current = editing;
  }, [editing]);

  return <section aria-labelledby={`${id}-label`}>
    <Flex justify='between' align='start' gap='3'>
      <Flex direction='column' gap='1'>
        <Flex align='center' gap='2'>
          <Text weight='bold' id={`${id}-label`}>{label}</Text>
          {adornment}
        </Flex>
        {caption && <Text size='1' color='gray'>{caption}</Text>}
      </Flex>
      <Button ref={trigger} variant='ghost' size='2' style={{ flexShrink: 0, marginTop: 0, height: 24, boxSizing: 'border-box' }}
        aria-label={`${editing ? 'Close' : 'Edit'} ${label.toLowerCase()}`} aria-expanded={editing} aria-controls={`${id}-editor`}
        onClick={editing ? onClose : onEdit}>
        {editing ? <><Cross1Icon aria-hidden='true' /> Close</> : <><Pencil1Icon aria-hidden='true' /> Edit</>}
      </Button>
    </Flex>
    <div id={`${id}-editor`} hidden={!editing}>{editing && children}</div>
    {status && <Text as='p' size='2' color='gray' role='status'>{status}</Text>}
    {error && <Text as='p' size='2' color='red' role='alert'>{error}</Text>}
  </section>;
};

export default EditableField;
