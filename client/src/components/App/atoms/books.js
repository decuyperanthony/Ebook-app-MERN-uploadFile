/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

// import axios from 'axios';

// import { API_URL } from '../../../utils/constante';

// let books = {};
// axios
//   .get(`${API_URL}/livres`)
//   .then((res) => {
//     console.log('res.data ====>', res.data);
//     // const articles = res.data;
//     books = [...res.data.livres];
//     console.log('books', books);
//   })
//   .catch((error) => console.trace(error));

export const booksState = atom({
  key: 'books-state',
  default: '',
});
