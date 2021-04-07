const dummy = (blogs) => {
  if (typeof blogs === typeof []) {
    return 1
  }
}

const totalLikes = (blogs) => {
  return blogs.reduce((initial, blog) => initial + blog.likes, 0)
}

const mostBlogs = (blogs) => {
  const index = {}
  let mostblogs = { author: '', blogs: 0 }
  blogs.forEach((blog) => {
    const author = blog.author

    index[author] ? (index[author] += 1) : (index[author] = 1)

    index[author] > mostblogs.blogs
      ? (mostblogs = { author: author, blogs: index[author] })
      : undefined
  })
  return mostblogs
}
const mostLikes = (blogs) => {
  const index = {}
  let mostlikes = { author: '', likes: 0 }
  blogs.forEach((blog) => {
    const author = blog.author
    index[author] ? (index[author] += blog.likes) : (index[author] = blog.likes)

    index[author] > mostlikes.likes
      ? (mostlikes = { author: author, likes: index[author] })
      : undefined
  })
  return mostlikes
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes,
}
