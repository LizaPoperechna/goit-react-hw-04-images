import React from 'react';
import { ReactComponent as SearchIcon } from '../../icons/icon-search.svg';
import PropTypes from 'prop-types'; 
import { Formik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import { Search, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';



export const SearchBar = ({ onSubmit }) => {
    const handleSubmit = (values, actions) => {
      if (values.title.trim() === '') {
        toast.error('Введіть запит для пошуку');
        return;
      }
  
      onSubmit(values.title);
      actions.setSubmitting(false);
      actions.resetForm();
    };

        
    return (
            <Search>
                <Formik initialValues={{ title: '' }} onSubmit={handleSubmit}>
                  <SearchForm>
                        <SearchFormButton type="submit" aria-label="search button">
                            <SearchIcon width="25" height="25" />
                            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                        </SearchFormButton>

                        <SearchFormInput
                            type="text"
                            name="title"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />
                    </SearchForm>
                </Formik>
                <ToastContainer autoClose={3000} theme="colored" />
            </Search>
    )
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };