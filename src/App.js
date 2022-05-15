import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

const images = [
  { src: 'images/card-1.jpeg', matched: false },
  { src: 'images/card-2.jpeg', matched: false },
  { src: 'images/card-3.jpeg', matched: false },
  { src: 'images/card-4.jpeg', matched: false },
  { src: 'images/card-5.jpeg', matched: false },
  { src: 'images/card-6.jpeg', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [turns, setTurns] = useState(5);
  const [score, setScore] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true);
      if (cardOne.src === cardTwo.src) {
        setScore((prevScore) => prevScore + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === cardOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetCard();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [cardOne, cardTwo]);

  const handleCard = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  const randomCards = () => {
    const randomCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(randomCards);
    setTurns(5);
    setScore(0);
    setCardOne(null);
    setCardTwo(null);
  };

  const resetCard = () => {
    setCardOne(null);
    setCardTwo(null);
    setDisabled(false);
  };

  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns((prevTurn) => prevTurn - 1);
    setDisabled(false);
  };

  useEffect(() => {
    randomCards();
  }, []);

  return (
    <div className='App'>
      <h1>Memory card game</h1>
      <p>Turns: {turns}</p>
      <p>Score: {score}</p>
      <button onClick={randomCards}>New Game</button>
      {turns === 0 ? (
        <div>
          <p>You lost. Do you want to reset game?</p>
          <button onClick={randomCards}>Try again!</button>
        </div>
      ) : null}
      {score === 6 ? (
        <div>
          <p>You won game. Do you want to try again?</p>
          <button onClick={randomCards}>Try again!</button>
        </div>
      ) : null}

      <div className='grid'>
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card.id}
              handleCard={handleCard}
              flip={card === cardOne || card === cardTwo || card.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
