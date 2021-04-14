import React, { useState } from 'react'
import PropTypes from 'prop-types'

const FromCreateBlog = ({ handleCreateBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <form
      id="formSubmit"
      onSubmit={() => handleCreateBlogs(event, title, author, url)}
    >
      <div>
        <input
          id="Title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button>Create</button>
    </form>
  )
}

FromCreateBlog.prototype = {
  handleCreateBlogs: PropTypes.func.isRequired,
}

export default FromCreateBlog
