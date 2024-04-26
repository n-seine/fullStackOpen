const setDb = async ({page, request})=> {
await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users/', {
      data : {
        username: 'testuser',
        name: 'testuser',
        password: 'testuser'
      }
    })
}

const login = async ({page}) => {
  await page.getByLabel('User name :').fill('testuser');
  await page.getByLabel('Password :').fill('testuser');
  await page.getByRole('button', { name: 'Login' }).click();
}

const createBlogs = async ({page}) => {
const blogs = [
  {
    title: 'test blog',
    author: 'test author',
    url: 'test url',
  }, 
  {
    title: 'test blog 2',
    author: 'test author 2',
    url: 'test url 2',
  }, 
  {
    title: 'test blog 3',
    author: 'test author 3',
    url: 'test url 3',
  }
]

await page.locator('input[name="title"]').fill(blogs[0].title);
await page.locator('input[name="author"]').fill(blogs[0].author);
await page.locator('input[name="url"]').fill(blogs[0].url);
await page.getByRole('button', { name: 'create' }).click();

await page.locator('input[name="title"]').fill(blogs[1].title);
await page.locator('input[name="author"]').fill(blogs[1].author);
await page.locator('input[name="url"]').fill(blogs[1].url);
await page.getByRole('button', { name: 'create' }).click();

await page.locator('input[name="title"]').fill(blogs[2].title);
await page.locator('input[name="author"]').fill(blogs[2].author);
await page.locator('input[name="url"]').fill(blogs[2].url);
await page.getByRole('button', { name: 'create' }).click();



}
const logout = async ({page}) => {
  await page.getByText('Logout').click();
}

module.exports = {setDb, login, createBlogs, logout}