import React from 'react';
import icon from '../../assets/img/Vector.svg';

import { useSelector } from 'react-redux';
import ProductInPopUpCart from './ProductInPopUpCart';
import { Outlet } from 'react-router-dom';

function PopUpCart() {
  const data = useSelector((state) => state.cartSlice);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClickOpen = () => {
    setIsOpen(true);
  };
  const onClickClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div
        className={`popupcart ${data.length < 1 && 'popupcart--empty'} ${
          isOpen && 'popupcart--full'
        }`}>
        <img
          src={icon}
          className="popupcart__icon"
          onClick={() => {
            isOpen ? onClickClose() : onClickOpen();
          }}
          alt=""
        />
        <div className="popupcart__count">{data.length}</div>
        {isOpen &&
          data.map((item) => (
            <ProductInPopUpCart id={item.id} onClickClose={setIsOpen} isEmpty={data.length > 1} />
          ))}
      </div>
      <Outlet />
    </>
  );
}

export default PopUpCart;
