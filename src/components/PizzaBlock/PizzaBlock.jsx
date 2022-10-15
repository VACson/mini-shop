import React, { useState } from 'react';
// import useAxios from 'axios-hooks';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { updateCartItem, deleteCartItem } from '../../store/slices/cartSlice';
import Confirm from '../Confirm/Confirm';
import Modal from '../Modal/Modal';

function PizzaBlock({ id, image, name, price, sizes, className }) {
  const pizzasInCart = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pizzaInfo, setPizzaInfo] = useState({ id: id, count: 1, chosenSize: null, cartId: null });

  // const [{ data, loading, error }, executePut] = useAxios(
  //   {
  //     url: 'http://localhost:7000/pizzas?id=' + id,
  //     method: 'PUT',
  //   },
  //   { manual: true },
  // );
  // function updateData(count) {
  //   executePut({
  //     data: {
  //       id,
  //       imageUrl: image,
  //       name,
  //       sizes,
  //       price,
  //       count: count,
  //     },
  //   });
  // }

  const alreadyInCart =
    pizzasInCart
      .map((items) => items.cartId)
      .indexOf(name.toString().concat(' ').concat(pizzaInfo.chosenSize)) >= 0
      ? true
      : false;
  const modal = () => {
    setIsConfirmOpen(false);
    setModalIsOpen(!modalIsOpen);
    modalIsOpen && setPizzaInfo((prevState) => ({ ...prevState, chosenSize: null }));
    modalIsOpen && setPizzaInfo((prevState) => ({ ...prevState, count: 1 }));
  };
  const confirmation = () => {
    setIsConfirmOpen(!isConfirmOpen);
  };
  const countIncrement = () => {
    setPizzaInfo((prevState) => ({ ...prevState, count: prevState.count + 1 }));
  };
  const countDecrement = () => {
    setPizzaInfo((prevState) => ({ ...prevState, count: prevState.count - 1 }));
  };
  const changeSize = (size) => {
    setPizzaInfo((prevState) => ({
      ...prevState,
      chosenSize: size,
      cartId: name.toString().concat(' ').concat(size),
    }));
  };
  const addPizza = () => {
    dispatch(updateCartItem(pizzaInfo));
    // updateData();
    modal();
  };
  const deletePizza = () => {
    dispatch(deleteCartItem(pizzaInfo));
    modal();
  };
  return (
    <div className={className}>
      <Link to={`/product:${id}`}>
        <img src={image} className="pizzablock__image" alt="" />
      </Link>
      <div className="pizzablock__name">{name}</div>
      <div className="pizzablock__buy">
        <button className="pizzablock__buy__button" onClick={() => modal()}>
          Додати до кошика
        </button>
        <span className="pizzablock__buy__price">{price}₴</span>
      </div>
      {modalIsOpen && (
        <Modal
          modal={modal}
          image={image}
          name={name}
          sizes={sizes}
          pizzaInfo={pizzaInfo}
          changeSize={changeSize}
          countDecrement={countDecrement}
          countIncrement={countIncrement}
          addPizza={addPizza}
          price={price}
          alreadyInCart={alreadyInCart}
          confirmation={confirmation}
        />
      )}
      {isConfirmOpen && <Confirm confirmation={confirmation} deletePizza={deletePizza} />}
    </div>
  );
}

export default PizzaBlock;
