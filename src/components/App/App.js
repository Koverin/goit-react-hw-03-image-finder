import { Component } from 'react';
import { apiServis, PER_PAGE } from '../../api/Api';
import { ToastContainer, toast } from 'react-toastify';

import { Box } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Error } from 'components/Error/Error';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    showModal: false,
    largeImage: '',
    perPageImg: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      this.searchImages();
    }

    this.scrollPage();
  }

  handleSubmit = query => {
    this.setState(() => {
      return { query: query, page: 1, images: [] };
    });
  };

  onLoadMore = () => {
    this.searchImages();
  };

  searchImages = async () => {
    try {
      this.setState({ isLoading: true });
      const { query, page } = this.state;
      const { hits, totalHits } = await apiServis(page, query);
      if (totalHits === 0) {
        toast.error(`No results were found for ${query}`);
        this.setState({ isLoading: false, perPageImg: null });
        return;
      }

      const images = this.imagesArray(hits);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          perPageImg: hits.length,
          page: prevState.page + 1,
        };
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  imagesArray = data => {
    return data.map(({ id, largeImageURL, tags, webformatURL }) => {
      return { id, largeImageURL, tags, webformatURL };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = largeImage => {
    this.setState({ largeImage }, () => {
      this.toggleModal();
    });
  };

  scrollPage = () => {
    if (this.state.page > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };
  render() {
    const { images, isLoading, perPageImg, error, showModal, largeImage } =
      this.state;
    return (
      <Box>
        <Searchbar onSubmit={this.handleSubmit} />

        {error && <Error texterror={error} />}

        {images.length > 0 && !error && (
          <>
            <ImageGallery images={images} onClick={this.onOpenModal} />
            {perPageImg && perPageImg < PER_PAGE && <p>No more pictures</p>}
          </>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt="Big images" />
          </Modal>
        )}
        {perPageImg === PER_PAGE && !isLoading && (
          <Button onClick={this.onLoadMore} />
        )}
        {isLoading && <Loader />}
        <ToastContainer autoClose={3000} />
      </Box>
    );
  }
}
