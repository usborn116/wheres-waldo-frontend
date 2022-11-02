import { useNavigate } from 'react-router';
import logo from '../../img/logo.png';

const ScoreModal = ({ time, mapId }) => {
  let navigate = useNavigate();

  const formSubmit = (data) => {
    const apiURL = 'https://cryptic-stream-77804.herokuapp.com/api/v1/scores';
    
    fetch(apiURL, {
      method: 'POST',
      mode: 'cors',
      body: data,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', e.target[0].value);
    formData.append('time', time);
    formData.append('map_id', mapId);
    formSubmit(formData);

    navigate('/');
  };
  
  return (
    <div className='ScoreModalContainer'>
      <div className='ScoreModal'>
        <img src={logo} alt='waldo' className='GameOverWaldo' />
        <h4>You found Waldo and friends in <span className='Time'>{time} seconds</span>!</h4>
        
        <form className='ScoreForm' onSubmit={(e) => handleSubmit(e)}>
          <input type='text' placeholder='Name' name='name'></input>
          <button type='submit'>Add Score</button>
        </form>
      </div>
    </div>
  )
};

export default ScoreModal;