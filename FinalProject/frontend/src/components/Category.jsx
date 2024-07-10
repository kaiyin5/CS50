import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import Task from "./Task";
import { ImInfo } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Category({ category, idx, open, handleOpen }) {
  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }
  return (
    <Accordion icon={<Icon id={idx} open={open} />} open={open === idx} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
      <AccordionHeader
        className={`border-b-0 transition-colors ${open === idx ? "text-blue-500 hover:!text-blue-700" : ""
          }`
        }
        onClick={() => handleOpen(idx)}
      >
        {category.name}
      </AccordionHeader>
      <AccordionBody className="pt-0 pb-1 text-base font-normal">
        <hr />
        <ul className="overflow-visible">
          {category.tasks.length === 0 ? <p className="text-center m-2">
            Have no practices of {category.name} yet... ●'◡'●</p> : null}
          {category.tasks.reverse().map((task, i) => (
            <Task key={i} task={task} idx={i} />
          ))}
        </ul>
        <hr />
        <div className="flex flex-row justify-evenly items-center mt-2">
            <Link to={`/category/${category._id}`} className="text-blue-400 border-2 border-blue-400/40 hover:shadow-lg font-bold rounded-lg flex justify-center items-center text-sm py-2 px-4">
              <ImInfo className="inline-flex items-baseline mr-1" /> Details
            </Link>
            <Link to={`/category/edit/${category._id}`} className="text-yellow-700 border-2 border-yellow-700/40 hover:shadow-lg font-bold rounded-lg flex justify-center items-center text-sm py-2 px-4">
              <FaEdit className="inline-flex items-baseline mr-1" /> Edit
            </Link>
          <Link to={`/category/delete/${category._id}`} className="text-red-600 border-2 border-red-600/40 hover:shadow-lg font-bold rounded-lg flex justify-center items-center text-sm py-2 px-4"
          >
            <MdDeleteOutline className="inline-flex items-baseline mr-1" /> Delete
          </Link>
        </div>
      </AccordionBody>
    </Accordion>
  );
}