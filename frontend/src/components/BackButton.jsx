import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import PropTypes from 'prop-types'; // Import PropTypes

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
      >
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  );
};

// Define PropTypes for your component
BackButton.propTypes = {
  destination: PropTypes.string, // Specify the expected prop type
};

export default BackButton;
