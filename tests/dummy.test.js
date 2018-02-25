const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = [1]

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})