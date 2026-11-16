import { test, expect } from '../fixtures/base-fixtures';
import { paths } from '../../src/constants/path';
import { faker } from '@faker-js/faker';

test('transform response', async ({ page, login, articlePage, createArticlePage, homePage }) => {

  const articleExample = {
    slug: 'playwright-route-mock',
    title: 'Стаття, яку повернув Playwright',
    description: 'Ця картка побудована з підготовленої API-відповіді.',
    body: 'Навчальний приклад route.fulfill().',
    tagList: ['playwright', 'mocks'],
    category: 'general',
    visibility: 'public',
    allowComments: true,
    cover: '',
    createdAt: '2026-01-15T12:00:00.000Z',
    updatedAt: '2026-01-15T12:00:00.000Z',
    favorited: false,
    favoritesCount: 7,
    author: {
      username: 'route-teacher',
      bio: '',
      image: '/avatar-placeholder.svg',
      following: false,
    },
  };

  // handler
  await page.route(
    '**/api/articles?**', // без query
    async (route, request) => {
      const response = await route.fetch();

      await route.fulfill({
        json: { articles: [articleExample], articlesCount: 1 },
        status: 200,
        headers: response.headers(),
      });
    },
  );

  await page.goto('http://104.168.59.50/articles');
  await page.waitForResponse('**/api/articles?**');
 await homePage.locators.globalFeedTab.click();
   await expect(homePage.locators.previewTitles.first()).toHaveText(articleExample.title);

  // await homePage.open();
  console.log('');
});
