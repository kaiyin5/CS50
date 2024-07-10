import React, {useState, useEffect} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaStickyNote } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const TaskModal = ({ task, onClose }) => {
  const {id} = useParams();
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl cursor-pointer'
          onClick={onClose}
        />
        <div className='mt-2 mb-1 ml-2 p-1 max-w-fit'>
          <h3 className='first-letter:uppercase font-bold'>remark of task - {task.name}</h3>
        </div>
        <hr />
        <div className='mt-4 mb-4 ml-2 p-1 max-w-fit'>
          <FaStickyNote className='text-2xl text-orange-800 inline-block mr-4 mb-1' />
          {task.description ? task.description : <div className='inline'>You did not have any remark on this task :o</div>}
        </div>
        <hr />
        <div className='mb-1 ml-2 p-1 max-w-fit'>
          <div className='my-4'>
            <span className='text-md mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(task.createdAt).toString().slice(0, 24)}</span>
          </div>
          <div className='my-4'>
            <span className='text-md mr-4 text-gray-500'>Last Update</span>
            <span>{new Date(task.updatedAt).toString().slice(0, 24)}</span>
          </div>
        </div>
        <hr />
        <div className='flex justify-evenly items-center mt-4 mb-1 ml-2 p-1'>
          <Link to={`/category/${id}/task/edit/${task._id}`}
            className="text-yellow-700 border-2 border-yellow-700/40 hover:shadow-lg font-bold rounded-lg flex justify-center items-center text-sm py-2 px-4"
          >
            <FaEdit className="inline-flex items-baseline mr-1" /> Edit
          </Link>
          <Link to={`/category/${id}/task/delete/${task._id}`}
            className="text-red-600 border-2 border-red-600/40 hover:shadow-lg font-bold rounded-lg flex justify-center items-center text-sm py-2 px-4"
          >
            <MdDeleteOutline className="inline-flex items-baseline mr-1" /> Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;