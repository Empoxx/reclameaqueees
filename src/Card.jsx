import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './Card.css';

function Card({ title, content, date, onDelete }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleDelete = () => {
    onDelete(content.id); // Chama onDelete passando o ID do Card
  }

  const cardAnimation = useSpring({
    transform: isVisible ? 'scale(1.2)' : 'scale(1)',
  });

  return (
    <div className="card" onClick={handleClick}>
      <h2>{title}</h2>
      <animated.div className="card-content" style={cardAnimation}>
        {isVisible ? (
          <p>
          <div className="card-text">
            <table className='table table-success table-striped'> 
            <thead>
              <tbody>
              <td class="teste"> {content} </td> <td class="teste2"> {date} </td>
              </tbody>
            </thead>
            </table> 
            <p>
            <button onClick={handleDelete}>Excluir</button>
            </p>
          </div>
          </p>
        ) : null}
      </animated.div>
    </div>
  );
}

export default Card;