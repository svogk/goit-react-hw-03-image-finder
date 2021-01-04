import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  largeImageURL,
  webformatURL,
  tags,
  onShowLargeImage,
}) => {
  const handleOpenLargeImage = () => {
    onShowLargeImage(largeImageURL);
  };

  return (
    <li className={s.imageGalleryItem}>
      <img
        className={s.imageGalleryItemImage}
        url={largeImageURL}
        src={webformatURL}
        alt={tags}
        onClick={handleOpenLargeImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onShowLargeImage: PropTypes.func,
};

export default ImageGalleryItem;
