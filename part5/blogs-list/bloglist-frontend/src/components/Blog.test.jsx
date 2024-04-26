import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import Button from './Button'

test('renders title and author of blog', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://reacttesting.com/',
    likes: 5,
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText(
    'Component testing is done with react-testing-library',
  )
  expect(title).toBeDefined()

  const author = screen.getByText('John Doe')
  expect(author).toBeDefined()

  const url = screen.queryByText('https://reacttesting.com/')
  expect(url).toBeNull()

  const likes = screen.queryByText('likes: 5')
  expect(likes).toBeNull()
})

test('renders url and likes of blog if show button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://reacttesting.com/',
    likes: 5,
  }

  render(<Blog blog={blog} />)

  const showButton = screen.getByText('view details')
  await userEvent.click(showButton)

  const url = screen.queryByText('https://reacttesting.com/')
  expect(url).toBeDefined()

  const likes = screen.queryByText('likes: 5')
  expect(likes).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {
  let blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://reacttesting.com/',
    likes: 5,
  }
  const handleLikes = () => {
    console.log(blog)
    blog.likes += 1
    console.log(blog)
    return blog
  }

  render(
    <Button handleClick={handleLikes} blog={blog}>
      like
    </Button>,
  )
  const likeButton = screen.getByText('like')

  await userEvent.click(likeButton)
  await userEvent.click(likeButton)
  expect(blog.likes).toBe(7)
})

test('clicking the remove button calls event handler', async () => {
  let blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://reacttesting.com/',
    likes: 5,
  }
  const handleDelete = () => {
    blog = {}
  }
  render(
    <Button handleClick={handleDelete} blog={blog}>
      delete
    </Button>,
  )
  const removeButton = screen.getByText('delete')
  await userEvent.click(removeButton)
  expect(blog).toStrictEqual({})
})
