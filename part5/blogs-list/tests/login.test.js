const { test, expect, beforeEach, describe } = require('@playwright/test')
const {setDb, login, createBlogs, logout} = require('./helper')



 describe('When not logged in', () => {
  beforeEach(async ({ page, request }) => {
    await setDb({page, request});
    await page.goto('http://localhost:5173')
    await login({page})
    await createBlogs({page})
    await logout({page})
  }, 30000)

  test('login form is shown', async ({ page }) => { 
const usernameInput =  page.getByLabel('User name :')
const passwordInput =  page.getByLabel('Password :')

await expect(usernameInput).toBeVisible()
await expect(passwordInput).toBeVisible()

   })

   test('user canot login with wrong credentials', async ({ page }) => {
    const usernameInput =  page.getByLabel('User name :')
    const passwordInput =  page.getByLabel('Password :')
    const loginButton =  page.getByRole('button', { name: 'Login' })

    await usernameInput.fill('user')
    await passwordInput.fill('wrong_password')

    await loginButton.click()

    await expect(page.getByText('invalid username or password')).toBeVisible()
   })

   test('user can login with correct credentials', async ({ page }) => {
    const usernameInput =  page.getByLabel('User name :')
    const passwordInput =  page.getByLabel('Password :')
    const loginButton =  page.getByRole('button', { name: 'Login' })

    await usernameInput.fill('testuser')
    await passwordInput.fill('testuser')
    await loginButton.click()

    await expect(page.getByText('welcome testuser')).toBeVisible()
    await expect(page.getByText('Logout')).toBeVisible()

   })

   test('user can not add a blog', async ({ page }) => {

    await expect(page.getByText('Create new blog')).toBeHidden()

   })

   test('user can still like a blog', async ({ page }) => {
    await page.getByRole('button', { name: 'view' }).last().click();
    await page.getByRole('button', { name: 'like' }).click();
    await page.waitForTimeout(300);
    expect( page.getByText('1 likes')).toBeVisible();     
   })

   test('user can not delete a blog', async ({ page }) => {
    await expect(page.getByText('Delete')).toBeHidden()
   })

   test('blogs are sorted by likes', async ({ page }) => {
    const initialBlogs = await (await page.request.get('http://localhost:3003/api/blogs')).body()
    console.log('initialBlogs', initialBlogs)
    const initialSortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes).map(blog => blog.likes + " likes")
    console.log('initialSortedBlogs', initialSortedBlogs)
    const allViewButtons = await page.getByRole('button', { name: 'view' }).all()
    console.log('allViewButtons', allViewButtons)
    for (const button of  allViewButtons) {
      await button.click();
    }
    const initialDisplayedLikes = await page.getByTestId('blog-likes').all()

    expect(initialDisplayedLikes).toEqual(initialSortedBlogs)

 })
})

 describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await setDb({page, request});
    await page.goto('http://localhost:5173')
    await login({page})
  })

  test('user can logout', async ({ page }) => {
 
    await expect(page.getByText('Logout')).toBeVisible()
  })

  test('user can add a blog', async ({ page }) => {
    await page.locator('input[name="title"]').fill('test blog');
    await page.locator('input[name="author"]').fill('test author');
    await page.locator('input[name="url"]').fill('test url');
    await page.getByRole('button', { name: 'create' }).click();

    expect(await page.getByTestId('blog-title').last().textContent()).toBe("test blog")
    expect(await page.locator('input[name="title"]').inputValue()).toBe("")
  })

  test('user can like a blog', async ({ page }) => {
    await page.locator('input[name="title"]').fill('test blog');
    await page.locator('input[name="author"]').fill('test author');
    await page.locator('input[name="url"]').fill('test url');
    await page.getByRole('button', { name: 'create' }).click();

    await page.getByRole('button', { name: 'view' }).click();
    await page.getByRole('button', { name: 'like' }).click();
    expect( page.getByText('1 likes')).toBeVisible();
  })

  test('user can delete a blog', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept())
    await page.locator('input[name="title"]').fill('test blog');
    await page.locator('input[name="author"]').fill('test author');
    await page.locator('input[name="url"]').fill('test url');
    await page.getByRole('button', { name: 'create' }).click();
    await page.getByRole('button', { name: 'view details' }).click();
    await page.getByRole('button', { name: 'remove' }).click({});
    await page.waitForTimeout(300);
    expect( await page.getByTestId('blog-title').count()).toBe(0);
  })

 })