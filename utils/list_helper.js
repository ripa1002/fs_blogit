const dummy = (blogs) => {
  return blogs.length
}

const totalLikes = (blogs) => {
  let all = 0
  for (let index = 0; index < blogs.length; index++) {
    all = all + blogs[index].likes 
  }
  return all
}

const favouriteBlog = (blogs) => {
  let apu = -1
  let apuIndeksi
  for (let index = 0; index < blogs.length; index++) {
    if (blogs[index].likes > apu) {
      apu = blogs[index].likes
      apuIndeksi = index
    }
  }
  return blogs[apuIndeksi]
}

const mostBlogs = (blogs) => {
  const authorsBlogs = []
  blogs.forEach( blog => {
    let author = authorsBlogs.find(aB => aB.author === blog.author)
    if(author=== undefined) {
      authorsBlogs.push({ author: blog.author, blogs: 1 })
    } else {
      author.blogs++
    }
  })
  
  let mostBlogsAuthor = authorsBlogs[0]
  authorsBlogs.forEach(author => {
    if(author.blogs > mostBlogsAuthor.blogs) {
      mostBlogsAuthor= author
    }
  })
  
  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  const likedBlogs = []
  blogs.forEach(blog => {
    let author = likedBlogs.find(lB => lB.author === blog.author)
    if(author=== undefined) {
      likedBlogs.push({ author: blog.author, likes: blog.likes })
    } else {
      author.likes = author.likes + blog.likes
    }
  })

  let mostLikesAuthor = likedBlogs[0]
  likedBlogs.forEach(author => {
    if (author.likes > mostLikesAuthor.likes) {
      mostLikesAuthor = author
    }
  })

  return mostLikesAuthor
}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}