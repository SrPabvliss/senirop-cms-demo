import { test, expect } from '@playwright/test'

test.describe('Articles table actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('tbody tr')
  })

  test.describe('Toggle Published Status', () => {
    test('should toggle published status from table switch', async ({
      page,
    }) => {
      const firstRow = page.locator('tbody tr').first()
      const switchElement = firstRow.locator('.MuiSwitch-root input')

      const initialState = await switchElement.isChecked()

      await switchElement.click()

      await expect(switchElement).toBeChecked({ checked: !initialState })

      await expect(page.locator('.MuiAlert-root')).toBeVisible()

      const switchThumb = firstRow.locator('.MuiSwitch-thumb')
      if (!initialState) {
        await expect(switchThumb).toHaveCSS(
          'background-color',
          /rgb\(109, 244, 145\)|#6DF491/i
        )
      } else {
        await expect(switchThumb).toHaveCSS(
          'background-color',
          /rgb\(255, 255, 255\)|#FFFFFF/i
        )
      }
    })

    test('should toggle multiple articles independently', async ({ page }) => {
      const rowCount = await page.locator('tbody tr').count()

      if (rowCount >= 2) {
        const firstSwitch = page
          .locator('tbody tr')
          .nth(0)
          .locator('.MuiSwitch-root input')
        const secondSwitch = page
          .locator('tbody tr')
          .nth(1)
          .locator('.MuiSwitch-root input')

        const firstInitialState = await firstSwitch.isChecked()
        const secondInitialState = await secondSwitch.isChecked()

        await firstSwitch.click()
        await expect(firstSwitch).toBeChecked({ checked: !firstInitialState })

        await expect(secondSwitch).toBeChecked({ checked: secondInitialState })

        await secondSwitch.click()
        await expect(secondSwitch).toBeChecked({ checked: !secondInitialState })

        await expect(firstSwitch).toBeChecked({ checked: !firstInitialState })
      }
    })

    test('should persist published status changes', async ({ page }) => {
      const firstSwitch = page
        .locator('tbody tr')
        .first()
        .locator('.MuiSwitch-root input')
      const initialState = await firstSwitch.isChecked()

      await firstSwitch.click()
      await expect(firstSwitch).toBeChecked({ checked: !initialState })

      await page.reload()
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('tbody tr')

      const switchAfterReload = page
        .locator('tbody tr')
        .first()
        .locator('.MuiSwitch-root input')
      await expect(switchAfterReload).toBeChecked({ checked: !initialState })
    })
  })

  test.describe('Row Hover Effects', () => {
    test('should show hover effect on table rows', async ({ page }) => {
      const firstRow = page.locator('tbody tr').first()

      await firstRow.hover()

      await expect(firstRow).toHaveCSS(
        'background-color',
        /rgba?\(0,\s*0,\s*0,\s*0\.04\)|#F9F9F9/i
      )
    })
  })
})
