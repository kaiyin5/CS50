import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { Card, Typography } from "@material-tailwind/react";
import { CiCircleMore } from "react-icons/ci";
import { MdLibraryAdd } from "react-icons/md";
import TaskModal from '../../components/TaskModal';

// table
const TABLE_HEAD = ["Date", "Task", "Duration", ""];

const ShowCategory = () => {
  const [piece, setPiece] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

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

  const TABLE_ROW = piece.tasks;
  TABLE_ROW && console.log()
  return (
    <div className='p-4 mx-2'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-4'>{piece.name}</h1>
        <Link to={`/category/${id}/newTask`} className='flex items-center text-xl min-w-[120px]'><MdLibraryAdd className='mr-1'/>Add task</Link>
      </div>
      <hr />
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Description</span>
        <span className='inline'>{piece.description}</span>
      </div>
      <hr />
      <Card className="h-full w-full my-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROW && TABLE_ROW.map((task, idx) => (
              <tr key={idx} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {task.createdAt.slice(0, 10)}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {task.name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {`${task.duration >= 60 ? `${Math.floor(task.duration / 60)} hr` : ''} ${task.duration >= 60 ? task.duration % 60 : task.duration} min`}
                  </Typography>
                </td>
                <td className="min-w-max py-4 px-0">
                  <Typography className="hover:cursor-pointer rounded-full w-min"
                  onClick={() => setShowModal(task)}>
                    <CiCircleMore className="text-xl border-transparent" />
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <hr />
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Create Time</span>
        <span>{new Date(piece.createdAt).toString().slice(0, 24)}</span>
      </div>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Last Update</span>
        <span>{new Date(piece.updatedAt).toString().slice(0, 24)}</span>
      </div>
      <br />
      <BackButton />
      {showModal && (
        <TaskModal task={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>

  );
};

export default ShowCategory