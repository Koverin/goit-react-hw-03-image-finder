import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onOpenModal,
}) => {
  return (
    <Item>
      <Img
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        onClick={onOpenModal}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
