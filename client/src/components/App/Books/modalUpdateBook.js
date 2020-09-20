/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

// == react hook form
import { useForm } from 'react-hook-form';

import axios from 'axios';

// == recoil
import {
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  Button, Modal,
} from 'react-bootstrap';
import { booksState } from '../atoms/books';
import { authorsState } from '../atoms/authors';

import { API_URL } from '../../../utils/constante';


const ModalUpdatedBook = ({ book }) => {
  console.log('book', book);
  const {
    _id, nom, description, nbrePage, auteur,
  } = book;

  // == -------- STATE DE LA MODAL ---------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // == ----------- STATE DE L APP ------------
  const [authors, setAuthors] = useRecoilState(authorsState);
  const setBooks = useSetRecoilState(booksState);

  //  form
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    // console.log('hello');
    console.log('data', data);
    //!  ------------ Multer ------------
    const formdata = new FormData();

    formdata.append('image', data.image[0]);
    formdata.append('auteur', data.auteur);
    formdata.append('description', data.description);
    formdata.append('nbrePage', data.nbrePage);
    formdata.append('nom', data.nom);
    //! à décommenter
    fetch(`${API_URL}/livre/${_id}`, {
      method: 'PATCH',
      body: formdata,
    }).then((resAddBooks) => {
      console.log('resAddBooks', resAddBooks);
      axios
        .get(`${API_URL}/livres`)
        .then((res) => {
          console.log('res.data ====>', res.data);
          // const articles = res.data;
          setBooks(res.data);
        })
        .catch((error) => console.trace(error));
    }).catch((error) => console.trace(error));
  };
  console.log('error react hook form', errors);

  //  get authors
  useEffect(() => {
    axios
      .get(`${API_URL}/authors`)
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((error) => console.trace(error));
  }, []);


  // == select authors
  let selectAuthors;
  if (authors) {
    selectAuthors = authors.map((author) => (
      <option key={author._id} value={author._id}>{author.prenom}{' '}{author.nom}</option>
    ));
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Modifier
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier le livre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input type="text" defaultValue={nom} placeholder="Titre" name="nom" ref={register({ required: true, maxLength: 100 })} />
              </div>
              <div>
                <input type="text" defaultValue={description} placeholder="Description" name="description" ref={register({ required: true, maxLength: 200 })} />
              </div>
              <div>
                <input
                  type="number"
                  defaultValue={nbrePage}
                  placeholder="Nombre de Pages"
                  name="nbrePage"
                  ref={register({
                    required: true,
                    // pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>
              <div>
                <input
                  // defaultValue={image}
                  type="file"
                  placeholder="image"
                  name="image"
                  ref={register({
                    required: true,
                    // pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>
              <div>
                <select defaultValue={auteur._id} name="auteur" ref={register({ required: true })}>
                  <option value="">choose...</option>
                  {selectAuthors}
                </select>
              </div>
              <div>
                <input type="submit" name="addBook2" />
              </div>
            </form>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button type="submit" variant="primary">Valider</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

ModalUpdatedBook.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.number,
    nom: PropTypes.string,
    description: PropTypes.string,
    nbrePage: PropTypes.number,
    auteur: PropTypes.string,
  }).isRequired,
};

export default ModalUpdatedBook;
