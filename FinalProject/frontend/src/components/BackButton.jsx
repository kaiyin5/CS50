import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex items-center justify-center'>
      <Link
        to={destination}
        className='px-4 py-1 rounded-lg w-fit'
      >
        <BsArrowLeft className='text-2xl inline-block' /> Back
      </Link>
    </div>
  );
};

export default BackButton;