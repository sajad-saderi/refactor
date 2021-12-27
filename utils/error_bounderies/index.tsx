import React from 'react';
import { addingCountryCodeToNumber } from '../../src/helpers/addingCountryCodeToNumber';

class ErrorBounderies extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { hasOccur: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <article className="minHeight errorBounderies">
          <span>{this.props.language.span}</span>
          <p>{this.props.language.p_1}</p>
          <p>
            {this.props.language.dial}{' '}
            <a href={`tel:${addingCountryCodeToNumber(this.props.language.call)}`}>
              {this.props.language.call}
            </a>
          </p>
        </article>
      );
    }
    return this.props.children;
  }
}

export default ErrorBounderies;
