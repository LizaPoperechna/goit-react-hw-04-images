import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { ImageGalItem, Image } from './ImageGalletyItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component  {
    state = {
      showModal: false,
    }


    toggleModal = () => {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
      }));
    };

  render() {
     const {showModal} = this.state;
     const {image} = this.props;

    return (
      <>
         <ImageGalItem onClick={this.toggleModal}>
            <Image             
              src={image.webformatURL}
              alt={image.tags} />
        </ImageGalItem>
        
        {showModal && (<Modal image={this.props.image} onClose={this.toggleModal}/>)}
      </>
     )
}}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
}