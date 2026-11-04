import * as React from 'react';
import { Badge } from '@radix-ui/themes';
import { send, subscribe } from '~/network/stream';
import NetworkIcon from '~/components/icons/NetworkIcon';
import styles from './index.module.css';

const PingPeriod = 15000;

const ConnectionStatus = (): React.ReactNode => {
  const [latency, setLatency] = React.useState<number | null>(null);
  const sentAt = React.useRef<number | null>(null);

  React.useEffect(() => {
    const unsubscribe = subscribe((message) => {
      if (message.name === 'Pong' && sentAt.current != null) {
        setLatency(Date.now() - sentAt.current);
      }
    });
    const ping = () => { sentAt.current = Date.now(); send('Ping'); };
    ping();
    const timer = window.setInterval(ping, PingPeriod);
    return () => { unsubscribe(); window.clearInterval(timer); };
  }, []);

  const color = latency == null ? 'gray' : latency < 200 ? 'green' : latency < 1000 ? 'orange' : 'red';
  return <div className={styles.root} title='Network connection latency' aria-label='Network connection latency'>
    <Badge size='1' color={color}><NetworkIcon size={13} />{latency == null ? '—' : `${latency}ms`}</Badge>
  </div>;
};

export default ConnectionStatus;
