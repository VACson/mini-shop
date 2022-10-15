import React from 'react';
import useAxios from 'axios-hooks';

import Confirm from '../Confirm/Confirm';

import { useSelector, useDispatch } from 'react-redux';
import { deleteCartItem } from '../../store/slices/cartSlice';

function ProductInPopUpCart({ id, onClickClose }) {
  const [{ data, loading, error }] = useAxios('http://localhost:7000/pizzas?id=' + id);
  const cart = useSelector((state) => state.cartSlice);
  const itemID = cart.map((items) => items.id).indexOf(id);
  const dispatch = useDispatch();
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const deletePizza = () => {
    dispatch(deleteCartItem({ id }));
    cart.length < 2 && onClickClose(false);
  };
  const confirmation = () => {
    setIsConfirmOpen(!isConfirmOpen);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{console.log(error)}Error!</p>;
  const pizza = data[0];
  return (
    <div className="productinpopup">
      <img src={pizza.imageUrl} className="productinpopup__image" alt="" />
      <div className="">{pizza.name}</div>
      <div className="">{pizza.price}</div>
      <div className="">{cart[itemID].count}</div>
      <button className={'modal__button modal__button--delete'} onClick={() => confirmation()}>
        Видалити з кошика
      </button>
      {isConfirmOpen && <Confirm pizzaInfo confirmation={confirmation} deletePizza={deletePizza} />}
    </div>
  );
}

export default ProductInPopUpCart;
