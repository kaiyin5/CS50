import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
    Button,
} from "@material-tailwind/react";

const CreateTask = () => {
    const [piece, setPiece] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3000/category/${id}`)
            .then((res) => {
                setPiece(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    }, [])

    const handleSave = () => {
        const data = {
            name,
            description,
            duration,
            category: id,
        };
        setLoading(true);
        axios
            .post(`http://localhost:3000/category/${id}/task`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Task created successfully', { variant: 'success' });
                navigate(`/category/${id}`);
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <h1 className='text-2xl my-4 text-center'>Add task to <span className='block'>{piece.name}</span></h1>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full p-4 mx-auto mb-8'>
                <div className='my-4'>
                    <label className='text-xl mr-4'>Task Name</label>
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
                <div className='my-4'>
                    <label className='text-xl mr-4'>Duration (in mins)</label>
                    <input
                        type='text'
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <Button className='p-2 mt-8 mb-2 text-lg' onClick={handleSave}>
                    Save
                </Button>
            </div>
            <BackButton />
        </div>
    )
}

export default CreateTask