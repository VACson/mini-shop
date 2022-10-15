import React from 'react';

function Modal({
  modal,
  image,
  name,
  sizes,
  pizzaInfo,
  changeSize,
  countDecrement,
  countIncrement,
  addPizza,
  price,
  alreadyInCart,
  confirmation,
}) {
  return (
    <div className="modal">
      <div className="modal__background" onClick={modal}></div>
      <div className="modal__popup">
        <img src={image} className="modal__image" alt="" />
        <div className="modal__name">{name}</div>
        {sizes && (
          <div className="modal__sizeblock">
            {sizes.map((item) => (
              <div
                className={`${
                  pizzaInfo.chosenSize === item ? 'modal__size modal__size--active' : 'modal__size'
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
              onClick={() => confirmation()}>
              Видалити з кошика
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
