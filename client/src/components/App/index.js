// == Import npm
import React from 'react';

import './styles.css';

import { RecoilRoot } from 'recoil';

// == component
import Books from './Books';

// == Composant
const App = () => (
  <div className="app">
    <RecoilRoot>
      <Books />
    </RecoilRoot>
  </div>
);

// == Export
export default App;
