import * as React from 'react';

type Props = {
  children: React.ReactNode,
  fallback?: React.ReactNode
};

type State = {
  error: Error | null
};

// See also:
// https://relay.dev/docs/guided-tour/rendering/error-states/
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return {error: error};
  }

  render(): React.ReactNode {
    const { error } = this.state;
    const { children, fallback } = this.props;
    return error ? fallback : children;
  }
}
