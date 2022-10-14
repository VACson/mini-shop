import React from 'react';

function PizzaBlock({ image, name, price, sizes, type }) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [pizzaCount, setPizzaCount] = React.useState(1);
  const modal = () => {
    setModalIsOpen(!modalIsOpen);
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
                  <div className="modal__size" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            )}
            <div className="count">
              <button className="count__button">-</button>
              <div className="">{pizzaCount}</div>
              <button className="count__button">+</button>
            </div>
            <div className="modal__order">
              <button className="modal__button" onClick={() => modal()}>
                Додати до кошика
              </button>
              <span className="modal__price">{price}₴</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PizzaBlock;
