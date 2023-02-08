import PropTypes from 'prop-types'; 

import { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root')

export function Modal({image, onClose}) {

useEffect(() => {
  const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
}, [onClose])


  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
      <Overlay onClick={handleBackdropClick}>
          <ModalWindow>
            <img src={image.largeImageURL} alt={image.tags}/>
          </ModalWindow>
      </Overlay>,
      modalRoot,
  )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
}


