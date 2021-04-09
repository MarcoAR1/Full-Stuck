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

const dbReset = async (Principal, Secondary, array, array2) => {
  await Principal.deleteMany({})
  await Secondary.deleteMany({})
  for (let x in array) {
    const newItem = new Principal(array[x])
    await newItem.save()
  }
  for (let x in array2) {
    const user = await Principal.find({})
    const currentPosition = Math.floor(Math.random() * user.length)
    const datos = array2[x]
    const newItem = new Secondary({
      ...datos,
      user_id: user[currentPosition]._id,
    })
    const noteSave = await newItem.save()
    user[currentPosition].blogs_id = user[currentPosition].blogs_id.concat(
      noteSave._id
    )
    await user[currentPosition].save()
  }
  return 'echo'
}

const dbFind = async (Table) => {
  const data = await Table.find({})

  return data.map((element) => element.toJSON())
}
const dbFindById = async (Table, id) => {
  const data = await Table.findById(id)

  return data.toJSON()
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes,
  dbReset,
  dbFind,
  dbFindById,
}
