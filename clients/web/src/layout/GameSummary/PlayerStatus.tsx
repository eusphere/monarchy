import * as React from 'react';
import { Badge, BadgeProps } from '@radix-ui/themes';
import type { PlayerFragment$data } from '~/autogen/relay/PlayerFragment.graphql';

type Props = {
  status: PlayerFragment$data['status'];
  size?: BadgeProps['size'];
  className?: string;
};

const PlayerStatus = (props: Props): React.ReactNode => {
  const { status } = props;
  let color: 'gray' | 'green' | 'red' | 'yellow' = 'gray';
  if (status === 'WON') color = 'green';
  if (status === 'LOST') color = 'red';
  if (status === 'PLAYING') color = 'yellow';
  return <Badge color={color} size={props.size} className={props.className}>{status}</Badge>;
};

export default PlayerStatus;
