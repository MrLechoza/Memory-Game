import React, { useState } from "react";
import Card from "./components/Cards";
import angular from "./assets/icon/angular.svg"
import astro from "./assets/icon/astro.svg"
import django from "./assets/icon/django.svg"
import fastapi from "./assets/icon/fastapi.svg"
import fresh from "./assets/icon/fresh.svg"
import laravel from "./assets/icon/laravel.svg"
import react from "./assets/icon/react.svg"
import vue from "./assets/icon/vue.svg"

interface CardData {
  id: number;
  icon: string;
  isFlipped: boolean;
}

const Game: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [firstCard, setFirstCard] = useState<CardData | null>(null);
  const [ isProcessing, setIsProcessing ] = useState(false)
  const [ isGameWon, setIsGameWon ] = useState(false)


  const initializeCards = () => {
    const icons = [
      angular, astro, django, fastapi, fresh, laravel, react, vue
    ];
    const allCards = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
      }));
    setCards(allCards);
    setFirstCard(null)
    setIsProcessing(false)
    setIsGameWon(false)
  };


  const handleCardClick = (id: number) => {
    if(isProcessing || isGameWon) return
    const newCards = [...cards];
    const clickedCard = newCards.find((card) => card.id === id);

    if (!clickedCard || clickedCard.isFlipped) return;

    clickedCard.isFlipped = true;
    setCards(newCards);

    if (!firstCard) {
      setFirstCard(clickedCard);
    } else {
      if (firstCard.icon === clickedCard.icon) {
        setFirstCard(null); 
        if (newCards.every((card) => card.isFlipped)) {
          setIsGameWon(true)
        }
      } else {
        setIsProcessing(true)
        setTimeout(() => {
          clickedCard.isFlipped = false;
          const updatedFirstCard = newCards.find(
            (card) => card.id === firstCard.id
          );
          if (updatedFirstCard) updatedFirstCard.isFlipped = false;
          setCards([...newCards]);
          setFirstCard(null);
          setIsProcessing(false)
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="mb-4 p-2 bg-green-500 text-white rounded text-center justify-center"
        onClick={initializeCards}
      >
        Start Game
      </button>
      {isGameWon && ( 
        <div className="mb-4 p-4 bg-blue-500 text-white rounded">
          🎉 Congratulations! You won the game! 🎉
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            icon={card.icon}
            isFlipped={card.isFlipped}
            onclick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
