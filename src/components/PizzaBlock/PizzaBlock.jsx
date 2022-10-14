import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { updateCartItem, deleteCartItem } from '../../store/slices/cartSlice';

function PizzaBlock({ id, image, name, price, sizes, type }) {
  const pizzasInCart = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pizzaCount, setPizzaCount] = useState(1);
  const [chosenSize, setChosenSize] = useState(null);
  // console.log(pizzasInCart);
  const alreadyInCart = pizzasInCart.map((items) => items.id).indexOf(id) >= 0 ? true : false;
  const modal = () => {
    setModalIsOpen(!modalIsOpen);
    modalIsOpen && setChosenSize(null);
    modalIsOpen && setPizzaCount(1);
  };
  const countIncrement = () => {
    setPizzaCount(pizzaCount + 1);
  };
  const countDecrement = () => {
    setPizzaCount(pizzaCount - 1);
  };
  const changeSize = (size) => {
    setChosenSize(size);
  };
  const addPizza = () => {
    dispatch(updateCartItem({ id, pizzaCount, chosenSize }), console.log(pizzasInCart));
    modal();
  };
  const deletePizza = () => {
    dispatch(deleteCartItem({ id }), console.log(pizzasInCart));
    modal();
  };
  return (
    <div className="pizzablock">
      <img src={image} className="pizzablock__image" alt="" />
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
                      chosenSize === item ? 'modal__size modal__size--active' : 'modal__size'
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
                  pizzaCount > 1 ? 'count__button' : 'count__button count__button--hidden'
                }`}
                onClick={() => countDecrement()}>
                -
              </button>
              <div className="">{pizzaCount}</div>
              <button className="count__button" onClick={() => countIncrement()}>
                +
              </button>
            </div>
            <div className="modal__order">
              <button
                className={`${
                  chosenSize === null ? 'modal__button modal__button--disabled' : 'modal__button'
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
