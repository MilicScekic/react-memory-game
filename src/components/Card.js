import React from 'react';

function Card({ card, handleCard, flip, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleCard(card);
    }
  };
  return (
    <div className='card'>
      <div className={flip ? 'flipped' : ''}>
        <img className='revealed' src={card.src} alt='' />
        <img
          className='hidden'
          src='/images/hiddenimage.jpeg'
          alt=''
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Card;
