import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, OpenModal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return (
      <Overlay onClick={this.handleBackdropClick}>
        <OpenModal>
          <img src={largeImageURL} alt={tags} />
        </OpenModal>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
