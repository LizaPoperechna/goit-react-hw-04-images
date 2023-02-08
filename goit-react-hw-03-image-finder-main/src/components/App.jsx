import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from "./Loader/Loader";
import { fetchImage } from './Api';


export class App extends Component {

    state = {
        page: 1,
        query: '',
        images: [],
        isLoading: false,
        error: false,
    };

    async componentDidUpdate(_, prevState) {
      const { page, query } = this.state;

      if (prevState.page !== this.state.page || prevState.query !== this.state.query)
       {
        try {
            this.setState({ isLoading: true });
            const data = await fetchImage(query, page);
            
            const images = data.hits;
            if (images.length === 0) {
              toast.warning('Нажаль, зображення по Вашому запиту відсутні');
              this.setState({error: true, isLoading: false});
              return
            }

            this.setState(prevState => ({
              images: [...prevState.images, ...images], isLoading: false,
            }));}

        catch (error) {
          this.setState({ error: true, isLoading: false })
          toast.error('Щось пішло не так, спробуйте ще раз')
        }
       }}

    getImages = title => {
      this.setState({page: 1, query: title, images: []})
    };


    loadMore = () => {
      const {page} = this.state;
      this.setState(prevState => ({page: page + 1}))
    };


  render() {
    const {images, isLoading} = this.state;

    return (
            <>
              <SearchBar onSubmit={this.getImages}></SearchBar>
              {isLoading && <Loader/> }
              <ImageGallery images={images}></ImageGallery>
              {images.length >= 12 && <Button onClick={this.loadMore}/>}
              <ToastContainer autoClose={3000} theme="colored" />
            </>
    )
}

}
