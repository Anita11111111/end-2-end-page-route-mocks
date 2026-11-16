import {test as base} from "@playwright/test"
import { CreateArticlePage } from "../../src/pages/createArticlePage/CreateArticlePage"
import { ArticlesPage } from "../../src/pages/articlesPage/ArticlePage"
import { HomePage } from "../../src/pages/homePage/homePage"

type PageFixtures = {
    createArticlePage: CreateArticlePage
    articlePage: ArticlesPage
    homePage: HomePage
}

export const test = base.extend<PageFixtures>({
    createArticlePage: async({page}, use) => {
        await use(new CreateArticlePage(page))
    },

    articlePage: async({page}, use) => {
        await use(new ArticlesPage(page))
    },

    homePage: async({page}, use) => {
        await use(new HomePage(page))
    }
})