import PropTypes from 'prop-types';
import { Component, cloneElement } from 'react';

export const AlertDropdownSourceRef = 'AlertDropdownSource';

export default class AlertDropdownSource extends Component {
  /** If you change the propTypes it would be great if you could also change the typescript file (axiom-components/src/index.d.ts) */
  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    closeDropdown: PropTypes.func,
  };

  static typeRef = AlertDropdownSourceRef;

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    const { key } = event;
    const { closeDropdown } = this.context;

    if (key === 'Escape') {
      closeDropdown();
    }
  }

  render() {
    const { children, ...rest } = this.props;
    return cloneElement(children, rest);
  }
}
