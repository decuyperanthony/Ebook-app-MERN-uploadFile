/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';

// == recoil
import {
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import {
  Table,
} from 'react-bootstrap';

import axios from 'axios';
import ModalUpdatedBook from './modalUpdateBook';

// requete
// import booksState from './index';
import { booksState } from '../atoms/books';
import { API_URL } from '../../../utils/constante';


const BooksTable = () => {
  const books = useRecoilValue(booksState);
  const setBooks = useSetRecoilState(booksState);

  let myBooks;
  // == get books
  useEffect(() => {
    axios
      .get(`${API_URL}/livres`)
      .then((res) => {
        myBooks = res.data;
        setBooks(myBooks);
      })
      .catch((error) => console.trace(error));
  }, [myBooks]);

  // == function update
  // const updateHandleClick = () => {
  //   console.log('update');
  // };

  // == map sur l'objet Books
  let booksJSX;
  if (books) {
    // console.log('books =====> ', books);
    booksJSX = books.livres.map((book) => (
      <tr key={book._id}>
        <td>{book.nom}</td>
        <td>{book.description}</td>
        <td>{book.nbrePage}</td>
        {/* <td>{book.auteur.nom} {book.auteur.prenom}</td> */}
        <td>auteur test</td>
        <td><img alt="book" src={`${API_URL}/images/${book.image}`} /></td>
        <td style={{
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'space-between',
          // height: '100%',
        }}
        >
          <div
            onClick={() => {
              axios.delete(`${API_URL}/livre/${book._id}`)
                .then((res) => {
                  console.log('res.data du onclick delete ===>', res.data);
                  axios
                    .get(`${API_URL}/livres`)
                    .then((res2) => {
                      console.log('res.data du get book after delete ===>', res2.data);
                      // const articles = res.data;
                      setBooks(res2.data);
                    })
                    .catch((error) => console.trace(error));
                });
            }}
            style={{ cursor: 'pointer', marginBottom: '1em' }}
          >
            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path name={book._id} fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
            </svg>
          </div>

          <div>
            <ModalUpdatedBook book={book} />
          </div>

        </td>
      </tr>
    ));
  }

  // == tableau
  const tableJSX = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>titre</th>
          <th>description</th>
          <th>Nombre de page</th>
          <th>auteur</th>
          <th>photo</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        {booksJSX}
      </tbody>
    </Table>
  );

  return (
    <>{tableJSX}</>
  );
};

export default BooksTable;
