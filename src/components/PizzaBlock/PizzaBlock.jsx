import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { updateCartItem, deleteCartItem } from '../../store/slices/cartSlice';

function PizzaBlock({ id, image, name, price, sizes, className }) {
  const pizzasInCart = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pizzaInfo, setPizzaInfo] = useState({ id: id, count: 1, chosenSize: 0, cartId: '' });
  // console.log(pizzasInCart);
  const alreadyInCart =
    pizzasInCart
      .map((items) => items.cartId)
      .indexOf(name.toString().concat(' ').concat(pizzaInfo.chosenSize)) >= 0
      ? true
      : false;
  const modal = () => {
    setModalIsOpen(!modalIsOpen);
    modalIsOpen && setPizzaInfo((prevState) => ({ ...prevState, chosenSize: null }));
    modalIsOpen && setPizzaInfo((prevState) => ({ ...prevState, count: 1 }));
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
    console.log(pizzaInfo);
  };
  const addPizza = () => {
    dispatch(updateCartItem(pizzaInfo), console.log(pizzasInCart));
    modal();
  };
  const deletePizza = () => {
    dispatch(deleteCartItem(pizzaInfo), console.log(pizzasInCart));
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
        <div className="modal">
          <div className="modal__background" onClick={() => modal()}></div>
          <div className="modal__popup">
            <img src={image} className="modal__image" alt="" />
            <div className="modal__name">{name}</div>
            {sizes && (
              <div className="modal__sizeblock">
                {sizes.map((item) => (
                  <div
                    className={`${
                      pizzaInfo.chosenSize === item
                        ? 'modal__size modal__size--active'
                        : 'modal__size'
                    }`}
                    key={item}
                    onClick={() => changeSize(item)}>
                    {item}см.
                  </div>
                ))}
              </div>
            )}
            <div className="count">
              <button
                className={`${
                  pizzaInfo.count > 1 ? 'count__button' : 'count__button count__button--hidden'
                }`}
                onClick={() => countDecrement()}>
                -
              </button>
              <div className="">{pizzaInfo.count}</div>
              <button className="count__button" onClick={() => countIncrement()}>
                +
              </button>
            </div>
            <div className="modal__order">
              <button
                className={`${
                  pizzaInfo.chosenSize === null
                    ? 'modal__button modal__button--disabled'
                    : 'modal__button'
                }`}
                onClick={() => addPizza()}>
                Додати до кошика
              </button>

              <span className="modal__price">{price}₴</span>
              {alreadyInCart && (
                <button
                  className={'modal__button modal__button--delete'}
                  onClick={() => deletePizza()}>
                  Видалити з кошика
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PizzaBlock;
