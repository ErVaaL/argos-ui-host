import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

type State = {
  error: Error | null;
};

export class RemoteErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          Failed to load {this.props.label}: {error.message}
        </div>
      );
    }
    return this.props.children;
  }
}
