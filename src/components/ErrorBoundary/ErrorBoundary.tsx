import React, { Component, ErrorInfo } from 'react';
import Fallback from './../../components/Fallback/Fallback';
interface IProps {
  children: React.ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  state: Readonly<IState>;
  props: Readonly<IProps>;
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
    this.props = props;
  }

  static getDerivedStateFromError(error: Error) {
    if (error) {
      return { hasError: true };
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Hello ERROR! ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <Fallback message="Something went wrong" />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
