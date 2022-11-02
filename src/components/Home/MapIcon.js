import { Link } from 'react-router-dom';

const MapIcon = ({ map }) => {
  const { slug, name, difficulty } = map;

  return (
    <Link to={slug} className='Card MapIcon'>
      <img src={require(`../../img/maps/${slug}.jpeg`)} alt={name}/>

      <div className='MapInfo'>
        <span>
          Difficulty:
          &#160;
          <span className='Bubble Difficulty'>
            {[...Array(difficulty)].map((d, i) => <i className='fa-solid fa-star' key={i}></i>)}
          </span>
        </span>

        <span>
          High score:
          &#160;
          <span className='Bubble HighScore'>
            {(map.scores && map.scores.length > 0) ? `${map.scores[0].time} s` : 'N/A'}
          </span>
        </span>
      </div>

      <h3>{name}</h3>
    </Link>
  );
};

export default MapIcon;