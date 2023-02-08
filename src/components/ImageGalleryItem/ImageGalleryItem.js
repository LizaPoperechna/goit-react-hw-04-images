import { useState } from 'react';
import PropTypes from 'prop-types'; 
import { ImageGalItem, Image } from './ImageGalletyItem.styled';
import { Modal } from 'components/Modal/Modal';


export function ImageGalleryItem({image}) {

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
      setShowModal(showModal => !showModal)
    };

      return (
      <>
         <ImageGalItem onClick={toggleModal}>
            <Image             
              src={image.webformatURL}
              alt={image.tags} />
        </ImageGalItem>
        
        {showModal && (<Modal image={image} onClose={toggleModal}/>)}
      </>
     )
}


ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
}