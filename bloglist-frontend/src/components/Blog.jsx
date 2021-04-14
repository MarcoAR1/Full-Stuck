import React from 'react'
import '../styles/blog.css'
import { blogStyle } from '../styles/blogStyle.jsx'

export const Blog = ({
  blogs = [],
  usuario,
  handleDeleteBlog,
  handleLiked,
}) => {
  const handleShowInfo = (id) => {
    const items = document.getElementsByClassName(`${id}`)
    items[0].textContent === 'hiden'
      ? (items[0].textContent = 'view')
      : (items[0].textContent = 'hiden')
    items[1].classList.toggle('hidden')
  }
  return (
    <div id="Blogs-Containers">
      {blogs.map((blog, i) => {
        return (
          <div key={blog.id} style={blogStyle}>
            <h3>
              {blog.title} {blog.author}
              <button
                className={`${blog.id}`}
                onClick={() => handleShowInfo(blog.id)}
              >
                view
              </button>
            </h3>
            <div className={`hidden ${blog.id}`}>
              <a href={blog.url}>{blog.url}</a>
              <p>
                likes: {blog.likes}
                <button onClick={() => handleLiked(blog.id, blog.likes + 1, i)}>
                  Like
                </button>
              </p>
              {blog.user_id.username === usuario.username && (
                <button onClick={() => handleDeleteBlog(blog.id, i)}>
                  remove
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Blog
