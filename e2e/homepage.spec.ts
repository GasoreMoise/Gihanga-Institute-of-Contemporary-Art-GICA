import { test, expect } from '@playwright/test';

test('homepage loads and displays hero section', async ({ page }) => {
  await page.goto('http://localhost:3000/en');
  
  // Check if the page loads
  await expect(page).toHaveTitle(/GICA/);
  
  // Check if hero section is visible
  await expect(page.getByRole('heading', { name: /Gihanga Institute/i })).toBeVisible();
});

test('homepage has all main sections', async ({ page }) => {
  await page.goto('http://localhost:3000/en');
  
  // Check for main sections
  await expect(page.getByRole('heading', { name: /About/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Welcome/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Exhibitions/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Programme/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Visit Us/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Contact/i })).toBeVisible();
});

test('Kinyarwanda locale works', async ({ page }) => {
  await page.goto('http://localhost:3000/rw');
  
  // Check if Kinyarwanda content is displayed
  await expect(page.getByRole('heading', { name: /Ikigo cya Gihanga/i })).toBeVisible();
});
