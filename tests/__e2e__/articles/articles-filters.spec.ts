import { test, expect } from '@playwright/test'

test.describe('Articles Search and Filters - Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('tbody tr')
  })

  test.describe('Search by Headline', () => {
    test('should search articles by headline', async ({ page }) => {
      const firstHeadline = await page
        .locator('tbody tr')
        .first()
        .locator('td')
        .first()
        .textContent()

      if (firstHeadline) {
        const searchTerm = firstHeadline.split(' ')[0]

        await page.getByPlaceholder(/search/i).fill(searchTerm)
        await page.waitForTimeout(500)

        const visibleRows = page.locator('tbody tr')
        const rowCount = await visibleRows.count()
        expect(rowCount).toBeGreaterThan(0)

        const firstRowText = await visibleRows.first().textContent()
        expect(firstRowText?.toLowerCase()).toContain(searchTerm.toLowerCase())
      }
    })
  })

  test.describe('Filter by Published Status', () => {
    test('should filter published articles', async ({ page }) => {
      const statusFilter = page.locator('select, .MuiSelect-root').first()
      await statusFilter.click()
      await page.getByText('published', { exact: true }).click()
      await page.waitForTimeout(300)

      const switches = page.locator('tbody tr .MuiSwitch-root input')
      const switchCount = await switches.count()

      for (let i = 0; i < switchCount; i++) {
        await expect(switches.nth(i)).toBeChecked()
      }
    })

    test('should filter unpublished articles', async ({ page }) => {
      const statusFilter = page.locator('select, .MuiSelect-root').first()
      await statusFilter.click()
      await page.getByText('unpublished', { exact: true }).click()
      await page.waitForTimeout(300)

      const switches = page.locator('tbody tr .MuiSwitch-root input')
      const switchCount = await switches.count()

      for (let i = 0; i < switchCount; i++) {
        await expect(switches.nth(i)).not.toBeChecked()
      }
    })

    test('should show all articles when "all" is selected', async ({
      page,
    }) => {
      const totalRows = await page.locator('tbody tr').count()

      const statusFilter = page.locator('select, .MuiSelect-root').first()
      await statusFilter.click()
      await page.getByText('published', { exact: true }).click()
      await page.waitForTimeout(300)

      await statusFilter.click()
      await page.getByText('all', { exact: true }).click()
      await page.waitForTimeout(300)

      await expect(page.locator('tbody tr')).toHaveCount(totalRows)
    })
  })

  test.describe('Combined Search + Filter', () => {
    test('should combine search and filter', async ({ page }) => {
      const firstHeadline = await page
        .locator('tbody tr')
        .first()
        .locator('td')
        .first()
        .textContent()

      if (firstHeadline) {
        const searchTerm = firstHeadline.split(' ')[0]

        await page.getByPlaceholder(/search/i).fill(searchTerm)
        await page.waitForTimeout(500)

        const statusFilter = page.locator('select, .MuiSelect-root').first()
        await statusFilter.click()
        await page.getByText('published', { exact: true }).click()
        await page.waitForTimeout(300)

        const visibleRows = page.locator('tbody tr')
        const rowCount = await visibleRows.count()

        if (rowCount > 0) {
          const firstRow = visibleRows.first()
          const rowText = await firstRow.textContent()
          const switchInRow = firstRow.locator('.MuiSwitch-root input')

          expect(rowText?.toLowerCase()).toContain(searchTerm.toLowerCase())
          await expect(switchInRow).toBeChecked()
        }
      }
    })
  })
})
