import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Button,
} from "@material-tailwind/react";

const DeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/category/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Piece deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4 mb-4'>
      <h1 className='text-3xl my-4 text-center'>Delete Piece</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full p-4 mx-auto'>
        <h3 className='text-2xl'>Delete Confirmation</h3>
        <Button
          className='text-white mt-4 mb-2 w-full bg-red-700'
          onClick={handleDelete}
        >
          Yes, Delete it
        </Button>
      </div>
      <BackButton />
    </div>
  )
}

export default DeleteCategory