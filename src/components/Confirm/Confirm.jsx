import React from 'react';

import { useDispatch } from 'react-redux';

import { deleteCartItem } from '../../store/slices/cartSlice';

function Confirm({ confirmation, deletePizza }) {
  return (
    <div className="confirmmodal">
      <div className="confirmmodal__container">
        Ви впевнені ?
        <button className="confirmmodal__container__button" onClick={deletePizza}>
          Так
        </button>
        <button className="confirmmodal__container__button" onClick={confirmation}>
          Скасувати
        </button>
      </div>
    </div>
  );
}

export default Confirm;
