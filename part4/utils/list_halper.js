const bcrypt = require('bcrypt')
const Blog = require('../models/Blog')
const User = require('../models/User')
const [...demoBlogs] = require('../test/demoBlogs')
const [...demoUsername] = require('../test/demoUsername')
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

const dbFind = async (Table) => {
  const data = await Table.find({})

  return data.map((element) => element.toJSON())
}
const dbFindById = async (Table, id) => {
  const data = await Table.findById(id)

  return data.toJSON()
}

const dbResetUser = async () => {
  await User.deleteMany({})

  for (let x in demoUsername) {
    let { username, password, name } = demoUsername[x]

    password = await bcrypt.hash(password, 10)

    const newUser = new User({ username, password, name })
    await newUser.save()
  }
}
const dbResetBlog = async () => {
  await Blog.deleteMany({})
  const user = await User.find({})
  for (let x in demoBlogs) {
    const { title, author, url, likes } = demoBlogs[x]
    const currentPositions = Math.floor(Math.random() * user.length)
    const newBlog = new Blog({
      title,
      author,
      url,
      likes,
      user_id: user[currentPositions]._id,
    })
    const createBlog = await newBlog.save()
    user[currentPositions].blogs_id = user[currentPositions].blogs_id.concat(
      createBlog._id.toString()
    )
    const saveUser = await user[currentPositions].save()
  }
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes,
  dbFind,
  dbFindById,
  dbResetUser,
  dbResetBlog,
}
