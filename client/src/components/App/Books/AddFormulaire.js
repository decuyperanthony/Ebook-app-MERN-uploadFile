/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';

// == react hook form
import { useForm } from 'react-hook-form';

import axios from 'axios';

// == recoil
import {
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import { booksState } from '../atoms/books';
import { authorsState } from '../atoms/authors';

// requete

// == boostrap
// import {
//   Table, Form, Col, Button,
// } from 'react-bootstrap';

import { API_URL } from '../../../utils/constante';


// == COMPONENT
const Formulaire = () => {
  const [authors, setAuthors] = useRecoilState(authorsState);
  const setBooks = useSetRecoilState(booksState);


  //  form
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data2) => {
    // console.log(data);
    // console.log('hello');
    console.log('data', data2);
    //!  ------------ Multer ------------
    const formdata = new FormData();

    formdata.append('image', data2.image[0]);
    formdata.append('auteur', data2.auteur);
    formdata.append('description', data2.description);
    formdata.append('nbrePage', data2.nbrePage);
    formdata.append('nom', data2.nom);

    fetch(`${API_URL}/livre`, {
      method: 'POST',
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

  // == form to add books
  // const formJSX = (
  //   <Form onSubmit={handleSubmit}>
  //     <Form.Row>
  //       <Col>
  //         <Form.Label>Titre</Form.Label>
  //         <Form.Control placeholder="Titre" />
  //       </Col>
  //       <Col xs={8}>
  //         <Form.Label>Description</Form.Label>
  //         <Form.Control placeholder="Description" />
  //       </Col>
  //     </Form.Row>
  //     <Form.Row>
  //       <Form.Group as={Col} controlId="formGridCity">
  //         <Form.Label>Nombre de page</Form.Label>
  //         <Form.Control />
  //       </Form.Group>

  //       <Form.Group as={Col} controlId="formGridState">
  //         <Form.Label>Auteur</Form.Label>
  //         <Form.Control as="select" defaultValue="Choose...">
  //           <option>Choose...</option>
  //           {selectAuthors}
  //         </Form.Control>
  //       </Form.Group>

  //       {/* <Form.Group as={Col} controlId="formGridZip">
  //         <Form.Label>Zip</Form.Label>
  //         <Form.Control />
  //       </Form.Group> */}
  //     </Form.Row>
  //     <Button variant="primary" type="submit">
  //       Submit
  //     </Button>
  //   </Form>
  // );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" placeholder="Titre" name="nom" ref={register({ required: true, maxLength: 100 })} />
        </div>
        <div>
          <input type="text" placeholder="Description" name="description" ref={register({ required: true, maxLength: 200 })} />
        </div>
        <div>
          <input
            type="number"
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
          <select name="auteur" ref={register({ required: true })}>
            <option value="">choose...</option>
            {selectAuthors}
          </select>
        </div>
        <div>
          <input type="submit" name="addBook" />
        </div>
      </form>
    </div>

  );
};

export default Formulaire;
