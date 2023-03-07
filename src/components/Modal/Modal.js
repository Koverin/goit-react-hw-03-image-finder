import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, OpenModal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <OpenModal>{this.props.children}</OpenModal>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
