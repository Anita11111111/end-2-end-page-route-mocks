import {BasePage} from "../BasePage"
import { CreateArticlePageLocators } from "./CreateArticlePageLocators"
import { faker } from '@faker-js/faker';

export class CreateArticlePage extends BasePage {
    readonly locators: CreateArticlePageLocators = new CreateArticlePageLocators(this.page)

       async fillInNewArticleData() {
        await this.locators.articleTitleInputField.fill(faker.lorem.sentence())
        await this.locators.articleDescriptionInputField.fill(faker.lorem.sentence())
        await this.locators.articleBodyInputField.fill(faker.lorem.paragraphs(2))
    }

    async createNewArticle({
    title,
    description,
    body,
  }: {
    title: string;
    description: string;
    body: string;
  }) {
        await this.locators.articleTitleInputField.fill(title)
        await this.locators.articleDescriptionInputField.fill(description)
        await this.locators.articleBodyInputField.fill(body)
        await this.locators.articleSubmitButton.click()

    }
}