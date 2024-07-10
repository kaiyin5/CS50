import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Button,
} from "@material-tailwind/react";

const EditCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/category/${id}`)
      .then((res) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }, [])

  const handleEdit = () => {
    const data = {
      name,
      description,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/category/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Piece edited successfully', { variant: 'success' });
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
      <h1 className='text-2xl my-4  text-center'>Edit Piece</h1>
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
        <Button className='p-2 m-8 text-lg' onClick={handleEdit}>
          Edit
        </Button>
      </div>
      <BackButton />
    </div>
  );
}

export default EditCategory