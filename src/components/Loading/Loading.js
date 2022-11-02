import waldo from '../../img/logo.png';
import './Loading.css';

const Loading = () => {
  return (
    <section className='Loading'>
      <span>
        <img src={waldo} alt='' className='LoadingWaldo' />
      </span>
    </section>
  );
};

export default Loading;