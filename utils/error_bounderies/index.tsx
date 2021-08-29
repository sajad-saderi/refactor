import React from "react";
import language from "../../public/languages/fa/errorBounderies.json";

class ErrorBounderies extends React.Component<{}, { [key: string]: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasOccur: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log("getDerivedStateFromError", error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <article className="minHeight errorBounderies">
          <span>{language.span}</span>
          <p>{language.p_1}</p>
          <p>
            {language.dial} <a href={`tel:${language.call}`}>{language.call}</a>
          </p>
        </article>
      );
    }
    return this.props.children;
  }
}

export default ErrorBounderies;
