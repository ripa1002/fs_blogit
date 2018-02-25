const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeAll(async () => {
  await Blog.remove({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('the first blog is about react patterns', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body[0].title).toBe('React patterns')
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    'title': 'Lisätään testi',
    'author': 'Testaaja',
    'url': 'www.testit.fi',
    'likes': 12
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api
    .get('/api/blogs')
  
  const titles = response.body.map(r => r.title)
  
  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(titles).toContain('Lisätään testi')
})

test('blog without title and url is not added ', async () => {
  const newBlog = {
    'author': 'Testaaja',
    'likes': 12
  }
  
  const blogsBefore = await api
    .get('/api/blogs')
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const response = await api
    .get('/api/blogs')
  
  expect(response.body.length).toBe(blogsBefore.body.length)
})

test('likes of blog without likes is set to zero ', async () => {
  const newBlog = {
    'title': 'Lisätään testi',
    'author': 'Testaaja',
    'url': 'www.testit.fi'
  }
    
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
  const response = await api
    .get('/api/blogs')

  const likes = response.body.map(l => l.likes)
  console.log(likes)
  expect(likes[likes.length - 1]).toBe(0)
})

afterAll(() => {
  server.close()
})