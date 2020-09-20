// == Import npm
import React from 'react';

// == Import style
import './styles.scss';
// import {
//   Table, Form, Col, Button,
// } from 'react-bootstrap'

// == import composant
import Formulaire from './AddFormulaire';
import BooksTable from './table';

// == Composant
const Books = () => {
  console.log('books-index');
  return (
    <div className="books">
      <BooksTable />
      <Formulaire />
    </div>
  );
};


// == Export
export default Books;

//! --------------------------------
