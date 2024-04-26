import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('User name :').fill('testuser');
  await page.getByLabel('Password :').fill('testuser');
  await page.getByRole('button', { name: 'Login' }).click();
});