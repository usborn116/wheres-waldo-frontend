import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { checkGuess, getCircleStyle, checkFound } from '../../helpers/helpers';
import './Level.css';
import Loading from '../Loading/Loading';
import LevelHeader from './LevelHeader';
import Timer from './Timer';
import ScoreModal from './ScoreModal';

const Level = () => {
  const { mapSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState({});
  const [found, setFound] = useState([]);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Fetch map data for selected level
  useEffect(() => {
    const apiURL = `https://cryptic-stream-77804.herokuapp.com/api/v1/maps/${mapSlug}`;
  
    fetch(apiURL, {mode: 'cors'})
    .then(response => response.json())
    .then(data => setMap(data));
  }, [mapSlug]);

  // Turn off loading when maps load
  useEffect(() => {
    if (Object.keys(map).length > 0) { setLoading(false); }
  }, [map]);

  // Update timer every second until gameOver
  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => { setTime(time + 1) }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameOver, time]);

  // Check for gameover when a character is found
  useEffect(() => {
    if (found.length < 4) { return; }
    setGameOver(true);
  }, [found]);

  const handleSuccessfulClick = (character) => {
    setFound(found.concat({
      slug: character.slug,
      style: getCircleStyle(character),
    }));
  };

  const handleClick = (e) => {
    const character = checkGuess(e, map.characters);
    if (character && !checkFound(found, character)) {
      handleSuccessfulClick(character);
    }
  };

  const levelScreen = (
    <section className='Level'>
      <div className='Card LevelCard'>
        <LevelHeader map={map} />

        <div className='LevelMain'>
          <div className='Characters'>
            <Timer time={time} />
            {(map.characters) ? map.characters.map((character) =>
              <span key={character.id}>
                <span className={checkFound(found, character) ? 'Check Found' :'Check'}><i className='fa-solid fa-check'></i></span>
                <img src={require(`../../img/characters/${character.slug}.jpg`)} alt={character.name} />
              </span>
            ) : null}
          </div>

          <button type='button' className='MapButton' onClick={(e) => handleClick(e)}>
            {found.map((found) =>
              <img src={require('../../img/circle.png')} alt='' className='Circle' style={found.style} key={found.slug} />
            )}
            {(Object.keys(map).length > 0) ? <img src={require(`../../img/maps/${map.slug}.jpeg`)} alt={map.name} className='Map' /> : null}
          </button>
        </div>
      </div>
      {(gameOver) ? <ScoreModal time={time} mapId={map.id} /> : null}
    </section>
  );

  return ((loading) ? <Loading /> : levelScreen);
}

export default Level;