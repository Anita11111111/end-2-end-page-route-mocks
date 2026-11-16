import { test, expect } from '../fixtures/base-fixtures';
import { paths } from '../../src/constants/path';

test('routes', async ({ createNewUser, newUserToken, authorizeBrowserAsNewUser, page,  createArticlePage, articlePage}) => {
    // handler
  await page.route('**/api/articles', async (route, request) => {
    if (request.method() === 'POST') {
      await route.abort();
      return
    }

    console.log(request.method(), request.url());
    await route.continue();
  });

    await page.goto(paths.articles) 
    await articlePage.locators.createNewArticleButton.click()
    await createArticlePage.fillInNewArticleData()
    await createArticlePage.locators.articleSubmitButton.click()

const failedRequest = page.waitForEvent('requestfailed',
  r => r.url().includes('/api/articles') && r.method() === 'POST')

await createArticlePage.locators.articleSubmitButton.click()

expect((await failedRequest).failure()?.errorText).toBe('net::ERR_FAILED')
await expect(page).not.toHaveURL(/\/article\//) // still on the editor, nothing was created
});
