import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateCategory from './pages/category/CreateCategory'
import ShowCategory from './pages/category/ShowCategory'
import EditCategory from './pages/category/EditCategory'
import DeleteCategory from './pages/category/DeleteCategory'
import CreateTask from './pages/task/CreateTask'
import EditTask from './pages/task/EditTask'
import DeleteTask from './pages/task/DeleteTask'

import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <Routes>
        {/* Category routes */}
        <Route path='/' element={<Home />} />
        <Route path='/category/create' element={<CreateCategory />} />
        <Route path='/category/:id' element={<ShowCategory />} />
        <Route path='/category/edit/:id' element={<EditCategory />} />
        <Route path='/category/delete/:id' element={<DeleteCategory />} />
        {/* Task routes */}
        <Route path='/category/:id/newTask' element={<CreateTask />} />
        <Route path='/category/:id/task/edit/:taskId' element={<EditTask />} />
        <Route path='/category/:id/task/delete/:taskId' element={<DeleteTask />} />
      </Routes>
    </div>
  )
}

export default App