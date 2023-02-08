import PropTypes from 'prop-types'; 

import React, { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root')

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };


  render() {
    const {image} = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
          <ModalWindow>
            <img src={image.largeImageURL} alt={image.tags}/>
          </ModalWindow>
      </Overlay>,
      modalRoot,
  )
  }

}


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
}


