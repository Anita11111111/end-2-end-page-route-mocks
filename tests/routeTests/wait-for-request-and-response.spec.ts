import { test, expect } from '../fixtures/base-fixtures';
import { paths } from '../../src/constants/path';

test('monitor request and response', async ({ createNewUser, newUserToken, authorizeBrowserAsNewUser, page,  createArticlePage, articlePage}) => {
      let responseCounter = 0;
  page.on('response', async (response) => {
    if (response.url().includes('/api/articles')) {
      responseCounter++;
      console.log(await response.json());
      console.log('next response')
    }
  });

//   let requestCounter = 0;
//   page.on('request', async (request) => {
//     if (request.url().includes('/api/articles')) {
//       requestCounter++;
//       console.log(request.url());
//     }
//   });


    await page.goto(paths.articles) 
    await articlePage.locators.createNewArticleButton.click()
    createArticlePage.fillInNewArticleData()

    const promiseResponse = page.waitForResponse('**/api/articles');
    const promiseRequest = page.waitForRequest('**/api/articles');

    await createArticlePage.locators.articleSubmitButton.click()

    const request = await promiseRequest;
    const response = await promiseResponse;
    //console.log(response)

    const json = await response.json();
    // console.log(json)
   

    return json.article.slug;

});
