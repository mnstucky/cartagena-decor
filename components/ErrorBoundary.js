import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1 className="is-size-3 ml-4">Something went wrong. Sorry!</h1>;
          <a href="/" className="is-size-4 ml-4">Return to safety.</a>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
