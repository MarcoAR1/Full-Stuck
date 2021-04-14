import React, { useRef, useState, useEffect } from 'react'
import {
  createBlog,
  deleteBlog,
  fixList,
  getAll,
  setToken,
  updateBlog,
} from '../services/blogs'
import { Blog } from './Blog'
import FromCreateBlog from './FromCreateBlog'
import Togglable from './Togglable'

const Bloger = ({ usuario, handleChangeUser, handleNotification }) => {
  const [blogs, setBlogs] = useState([])
  const blogForm = useRef()
  const handleSingOut = () => {
    handleNotification(`Goodbye ${usuario.name}`)
    handleChangeUser(null)
    window.localStorage.clear()
    setToken('')
  }
  const handleVisibility = () => {
    blogForm.current.toggleVisible()
  }

  const handleLiked = async (id, likes, position) => {
    const response = await updateBlog(id, { likes })
    if (response.status) {
      console.log(response)
    } else {
      const newBlgos = [...blogs]
      newBlgos[position].likes = response.likes
      setBlogs(newBlgos.sort((a, b) => b.likes - a.likes))
    }
  }

  const handleDeleteBlog = async (id, position) => {
    const waitingConfirm = async () => {
      const response = await deleteBlog(id)
      if (response === 204) {
        const newBlogs = [...blogs]
        newBlogs.splice(position, 1)
        setBlogs(newBlogs)
      } else {
        console.log(response)
      }
    }
    window.confirm(
      `You are sure to delete ${blogs[position].title} by ${blogs[position].author}`
    )
      ? waitingConfirm()
      : alert('I dont delete blog :D')
  }

  const handleCreateBlogs = async (event, title, author, url) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    const request = await createBlog(newBlog)
    if (request.status) {
      handleNotification(fixList(request), true)
    } else {
      setBlogs((prevBlogs) => {
        return [...prevBlogs, request]
      })
      handleVisibility()
      handleNotification(`Add blog successful ${request.title}`)
    }
  }

  useEffect(() => {
    const GetBlogs = async () => {
      const allBlog = await getAll()
      setBlogs(allBlog.sort((a, b) => b.likes - a.likes))
    }
    GetBlogs()
  }, [])

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {usuario.name} <button onClick={handleSingOut}>Sing Out</button>
      </p>
      <Togglable buttonLabel="New Blog" ref={blogForm}>
        <FromCreateBlog
          handleCreateBlogs={handleCreateBlogs}
          handleChangeBlogs={setBlogs}
          handleNotification={handleNotification}
          handleVisibility={handleVisibility}
        />
      </Togglable>
      <Blog
        blogs={blogs}
        usuario={usuario}
        handleLiked={handleLiked}
        handleDeleteBlog={handleDeleteBlog}
      />
    </div>
  )
}

export default Bloger
