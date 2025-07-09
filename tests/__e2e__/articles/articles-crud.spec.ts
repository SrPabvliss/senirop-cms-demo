import { test, expect } from '@playwright/test'

test.describe('Articles CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForLoadState('networkidle')
  })

  test.describe('CREATE Article', () => {
    test('should create a new article successfully', async ({ page }) => {
      const newArticle = {
        headline: `E2E Test Article ${Date.now()}`,
        author: 'E2E Test Author',
        body: 'This is a comprehensive test article created during E2E testing to verify the complete create functionality works correctly.',
        date: '2025-07-15',
      }

      await page.getByRole('button', { name: /add article/i }).click()

      await expect(page.locator('.MuiDrawer-root')).toBeVisible()
      await expect(page.getByText('New article')).toBeVisible()

      await expect(page.getByRole('button', { name: /save/i })).toBeDisabled()

      await page.getByLabel('Headline').fill(newArticle.headline)
      await page.getByLabel('Author').fill(newArticle.author)
      await page.getByLabel('Body').fill(newArticle.body)
      await page.getByLabel('Publish Date').fill(newArticle.date)

      await expect(page.getByRole('button', { name: /save/i })).toBeEnabled()

      await page.getByRole('button', { name: /save/i }).click()

      await expect(page.locator('.MuiDrawer-root')).not.toBeVisible()

      await expect(page.getByText(newArticle.headline)).toBeVisible()

      await expect(page.locator('.MuiAlert-root')).toBeVisible()

      const articleRow = page
        .locator('tr')
        .filter({ hasText: newArticle.headline })
      await expect(articleRow.getByText(newArticle.author)).toBeVisible()
    })

    test('should close create form without saving when clicking CLOSE', async ({
      page,
    }) => {
      await page.getByRole('button', { name: /add article/i }).click()
      await expect(page.locator('.MuiDrawer-root')).toBeVisible()

      await page
        .getByLabel('Headline')
        .fill('Test data that should be discarded')

      await page.getByRole('button', { name: /close/i }).click()

      await expect(page.locator('.MuiDrawer-root')).not.toBeVisible()

      await expect(
        page.getByText('Test data that should be discarded')
      ).not.toBeVisible()
    })
  })

  test.describe('READ Article', () => {
    test('should open article details when clicking on table row', async ({
      page,
    }) => {
      await page.waitForSelector('tbody tr')

      const firstRow = page.locator('tbody tr').first()
      const headline = await firstRow.locator('td').first().textContent()

      await firstRow.click()

      await expect(page.locator('.MuiDrawer-root')).toBeVisible()

      if (headline) {
        await expect(
          page.locator('.MuiDrawer-root').getByText(headline)
        ).toBeVisible()
      }

      await expect(page.getByLabel('Headline')).toBeDisabled()
      await expect(page.getByLabel('Author')).toBeDisabled()
      await expect(page.getByLabel('Body')).toBeDisabled()
      await expect(page.getByLabel('Publish Date')).toBeDisabled()

      await expect(
        page.locator('.MuiDrawer-root').locator('.MuiSwitch-root input')
      ).toBeEnabled()

      await expect(page.getByRole('button', { name: /edit/i })).toBeVisible()
    })

    test('should toggle published status from article details view', async ({
      page,
    }) => {
      await page.waitForSelector('tbody tr')
      await page.locator('tbody tr').first().click()
      await expect(page.locator('.MuiDrawer-root')).toBeVisible()

      const switchElement = page
        .locator('.MuiDrawer-root')
        .locator('.MuiSwitch-root input')
      const initialState = await switchElement.isChecked()

      await switchElement.click()

      await expect(switchElement).toBeChecked({ checked: !initialState })

      if (await page.getByRole('button', { name: /edit/i }).isEnabled()) {
        await page.getByRole('button', { name: /edit/i }).click()
      }

      await expect(page.locator('.MuiAlert-root')).toBeVisible()

      const tableSwitch = page
        .locator('tbody tr')
        .first()
        .locator('.MuiSwitch-root input')
      await expect(tableSwitch).toBeChecked({ checked: !initialState })
    })
  })

  test.describe('UPDATE Article', () => {
    test('should edit article from details view', async ({ page }) => {
      const updatedData = {
        headline: `Updated E2E Article ${Date.now()}`,
        author: 'Updated Author',
        body: 'This article content has been updated via E2E testing.',
      }

      await page.waitForSelector('tbody tr')
      const firstRow = page.locator('tbody tr').first()

      await firstRow
        .locator('[aria-label*="more"], .MuiIconButton-root')
        .last()
        .click()

      await page.getByText('Edit').click()

      await expect(page.locator('.MuiDrawer-root')).toBeVisible()

      await expect(page.getByLabel('Headline')).toBeEnabled()
      await expect(page.getByLabel('Author')).toBeEnabled()
      await expect(page.getByLabel('Body')).toBeEnabled()

      await page.getByLabel('Headline').clear()
      await page.getByLabel('Headline').fill(updatedData.headline)

      await page.getByLabel('Author').clear()
      await page.getByLabel('Author').fill(updatedData.author)

      await page.getByLabel('Body').clear()
      await page.getByLabel('Body').fill(updatedData.body)

      await page.getByRole('button', { name: /update/i }).click()

      await expect(page.locator('.MuiDrawer-root')).not.toBeVisible()

      await expect(page.locator('.MuiAlert-root')).toBeVisible()

      await expect(page.getByText(updatedData.headline)).toBeVisible()
      await expect(page.getByText(updatedData.author)).toBeVisible()
    })

    test('should not allow to save if there are no changes', async ({
      page,
    }) => {
      await page.waitForSelector('tbody tr')
      const firstRow = page.locator('tbody tr').first()

      await firstRow
        .locator('[aria-label*="more"], .MuiIconButton-root')
        .last()
        .click()

      await page.getByText('Edit').click()

      await expect(page.locator('.MuiDrawer-root')).toBeVisible()

      await expect(page.getByRole('button', { name: /update/i })).toBeDisabled()
    })
  })

  test.describe('DELETE Article', () => {
    test('should delete article through actions menu', async ({ page }) => {
      await page.waitForSelector('tbody tr')

      const firstRow = page.locator('tbody tr').first()
      const headlineToDelete = await firstRow
        .locator('td')
        .first()
        .textContent()

      await firstRow
        .locator('[aria-label*="more"], .MuiIconButton-root')
        .last()
        .click()

      await page.getByText('Delete').click()

      await expect(page.locator('[role="dialog"]')).toBeVisible()
      await expect(page.getByText(/delete article/i)).toBeVisible()
      await expect(page.getByText(/are you sure/i)).toBeVisible()

      await page.getByRole('button', { name: /delete/i }).click()

      await expect(page.locator('[role="dialog"]')).not.toBeVisible()

      await expect(page.locator('.MuiAlert-root')).toBeVisible()

      if (headlineToDelete) {
        await expect(page.getByText(headlineToDelete)).not.toBeVisible()
      }
    })

    test('should cancel deletion when clicking CANCEL in confirmation', async ({
      page,
    }) => {
      await page.waitForSelector('tbody tr')
      const initialRowCount = await page.locator('tbody tr').count()

      const firstRow = page.locator('tbody tr').first()
      const headlineToKeep = await firstRow.locator('td').first().textContent()

      await firstRow
        .locator('[aria-label*="more"], .MuiIconButton-root')
        .last()
        .click()
      await page.getByText('Delete').click()

      await expect(page.locator('[role="dialog"]')).toBeVisible()

      await page.getByRole('button', { name: /cancel/i }).click()

      await expect(page.locator('[role="dialog"]')).not.toBeVisible()

      if (headlineToKeep) {
        await expect(page.getByText(headlineToKeep)).toBeVisible()
      }

      await expect(page.locator('tbody tr')).toHaveCount(initialRowCount)
    })
  })
})
