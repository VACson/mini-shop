import './App.css';
import Home from './views/Home/Home';
import Product from './views/Product/Product';
import PopUpCart from './components/PopUpCart/PopUpCart';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PopUpCart />}>
        <Route index element={<Home />} />
        <Route path="product:id" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
