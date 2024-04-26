import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('User name :').click();
  await page.getByLabel('User name :').fill('user');
  await page.getByLabel('User name :').press('Tab');
  await page.getByLabel('Password :').fill('user');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('input[name="title"]').click();
  await page.locator('input[name="title"]').fill('test blog');
  await page.locator('input[name="author"]').click();
  await page.locator('input[name="author"]').fill('test author');
  await page.locator('input[name="url"]').click();
  await page.locator('input[name="url"]').fill('test url');
  await page.getByRole('button', { name: 'create' }).click();
});