import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Button,
} from "@material-tailwind/react";


const CreateCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    const data = {
      name,
      description,
    };
    setLoading(true);
    axios
      .post('http://localhost:3000/category', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Category created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl my-4 text-center'>Create Piece</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full p-4 mx-auto mb-8'>
        <div className='my-4'>
          <label className='text-xl mr-4'>Piece Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4'>Description (Optional)</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <Button className='p-2 mt-8 mb-2 text-lg' onClick={handleSave}>
          Save
        </Button>
      </div>
      <BackButton />
    </div>
  );
}

export default CreateCategory