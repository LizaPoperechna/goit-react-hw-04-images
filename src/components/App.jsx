import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from "./Loader/Loader";
import { fetchImage } from './Api';


export function App() {

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    //const [error, setError] = useState(null);


  useEffect(() => {

    if (query === '') {
      return;
    }   

    const fetchImageByQuery = async searchQuery => {
        setIsLoading(true);
           try {
                  const data = await fetchImage(query, page);
                  const images = data.hits;

                  setImages(prevState => [...prevState, ...images]);
                  setIsLoading(false);

                  if (images.length === 0) {
                         toast.warning('Нажаль, зображення по Вашому запиту відсутні');
                       //  setError(error);
                     return;
                  }
                   }
      
                  catch (error) {
                 //   setError(error);
                    toast.error('Щось пішло не так, спробуйте ще раз')
                } finally {
                    setIsLoading(false);
                }
    }
  
    fetchImageByQuery(); 
  }, [page, query]);


  const getImages = title => {
      setImages([]);
      setPage(1);
      setQuery(title);
    };

  const loadMore = () => {
      setPage(page => page + 1)
    };

  return (
            <>
              <SearchBar onSubmit={getImages}></SearchBar>
              {isLoading && <Loader/> }
              <ImageGallery images={images}></ImageGallery>
              {images.length >= 12 && <Button onClick={loadMore}/>}
              <ToastContainer autoClose={3000} theme="colored" />
            </>
    )
}
