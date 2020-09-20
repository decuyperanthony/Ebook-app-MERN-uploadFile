/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export const authorsState = atom({
  key: 'authors-state',
  default: [],
});
