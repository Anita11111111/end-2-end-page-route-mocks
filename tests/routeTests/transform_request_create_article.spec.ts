import { test, expect } from '../fixtures/base-fixtures';
import { paths } from '../../src/constants/path';
import { faker } from '@faker-js/faker';

test('transform request', async ({ page, login, articlePage, createArticlePage, homePage }) => {
  const postData = {
    article: {
      title: 'test',
      description: 'test',
      body: 'test',
      tagList: [],
      category: 'general',
      visibility: 'public',
      allowComments: true,
      cover: '',
    },
  };

  // handler
  await page.route(
    (url) => url.pathname === '/api/articles', // без query
    async (route, request) => {
      if (request.method() !== 'POST') {
        return route.continue();
      }

      await route.continue({
        postData: postData,
        headers: request.headers(),
        method: request.method(),
        url: request.url(),
      });
    },
  );

  const article = {
    title: `Title-${faker.string.alphanumeric(10)}`,
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
  };


  await page.goto('http://104.168.59.50/articles');
  await articlePage.locators.createNewArticleButton.click()
  
  const slug = await createArticlePage.createNewArticle(article)


  console.log(slug);

  await expect(articlePage.locators.articleTitle).toHaveText(postData.article.title);
  await expect(articlePage.locators.articleBody).toContainText(postData.article.body);

  // Нова стаття має з'явитись першою в Global feed (сортування newest)
  await page.goto('http://104.168.59.50/articles');
  await homePage.locators.globalFeedTab.click();
  await expect(homePage.locators.previewTitles.first()).toHaveText(postData.article.title);
});
