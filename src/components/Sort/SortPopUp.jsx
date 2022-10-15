import React from 'react';
import { useDispatch } from 'react-redux';
import { sortItems } from '../../store/slices/sortSlice';

function SortPopUp() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const openSort = () => {
    setIsOpen(true);
  };
  const chooseSortBy = (item) => {
    console.log(item);
    dispatch(sortItems(item));
    setIsOpen(false);
  };
  return (
    <div className={`sortpopup ${isOpen && 'sortpopup--active'}`}>
      <div className="sortpopup__item" onClick={() => openSort()}>
        &#9650;
      </div>
      {isOpen && (
        <div className="sortpopup__item" onClick={() => chooseSortBy('name')}>
          За алфавітом
        </div>
      )}
      {isOpen && (
        <div className="sortpopup__item" onClick={() => chooseSortBy('count')}>
          За кількістю
        </div>
      )}
      <div className="sortpopup__item" onClick={() => openSort()}>
        &#9660;
      </div>
    </div>
  );
}

export default SortPopUp;
