import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import apiService from './apiService/apiService';
import s from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    hits: [],
    loading: false,
    largeImage: '',
    showModal: false,
  };

  componentDidMount() {
    console.log('App componentDidMount');
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true });

      apiService
        .fetchHits(searchQuery, page)
        .then(data => {
          this.setState(prevState => ({
            hits: [...prevState.hits, ...data.hits],
          }));
        })
        .catch(error => console.error(error))
        .finally(() => this.setState({ loading: false }));
    }

    console.log('App componentDidUpdate');

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery !== searchQuery)
      this.setState({
        hits: [],
        searchQuery: searchQuery,
        page: 1,
      });
  };

  handleAddPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleShowLargeImage = largeImageURL => {
    this.setState({
      showModal: true,
      largeImage: largeImageURL,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { hits, loading, showModal, largeImage } = this.state;
    const buttonIsVisible = hits.length > 0 && !loading;

    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          hits={hits}
          onShowLargeImage={this.handleShowLargeImage}
        />
        <div className={s.boxSpinner}>
          <Loader loading={loading} />
        </div>
        {buttonIsVisible && <Button onClick={this.handleAddPage} />}
        {showModal && (
          <Modal onOpenLargeImage={largeImage} onClose={this.toggleModal} />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
