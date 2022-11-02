import { useState, useEffect } from 'react';
import './Home.css';
import MapIcon from './MapIcon';
import Loading from '../Loading/Loading';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [maps, setMaps] = useState([]);

  // Fetch all map data on mount
  useEffect(() => {
    const apiURL = 'https://cryptic-stream-77804.herokuapp.com/api/v1/maps';

    fetch(apiURL, {mode: 'cors'})
    .then(response => response.json())
    .then(data => setMaps(data));
  }, []);

  // Turn off loading when maps load
  useEffect(() => {
    if (maps.length > 0) { setLoading(false); }
  }, [maps]);

  const homeScreen = (
    <section className='Home'>
      <h2 className='Card TitleCard'>Choose a map to start!</h2>

      <div className='MapGrid'>
        {maps.map((map) => 
          <MapIcon map={map} key={map.id} />
        )}
      </div>
    </section>
  );

  return ((loading) ? <Loading /> : homeScreen);
};

export default Home;