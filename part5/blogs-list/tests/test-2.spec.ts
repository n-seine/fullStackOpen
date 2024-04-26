import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=%7Bmessage+%26%26+%3CToast+content%3D%7Bmessage%7D+%2F%3E%7D&oq=%7Bmessage+%26%26+%3CToast+content%3D%7Bmessage%7D+%2F%3E%7D&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBBzUzM2owajKoAgCwAgE&sourceid=chrome&ie=UTF-8');
});