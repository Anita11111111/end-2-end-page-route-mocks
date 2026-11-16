import {Locator} from '@playwright/test'
import { BaseLocators } from "../BaseLocators";

export class ArticlePageLocators extends BaseLocators{
    readonly avatarField: Locator = this.page.getByTestId('settings-avatar-preview').locator('img')
    readonly createNewArticleButton: Locator = this.page.getByTestId('nav-new-article')
    readonly articleTitle: Locator = this.page.getByTestId('article-title')
    readonly articleBody: Locator = this.page.getByTestId('article-body')
    readonly globalFeedTab: Locator = this.page.getByTestId('feed-tab-global')
}

