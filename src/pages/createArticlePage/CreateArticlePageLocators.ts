import { BaseLocators } from "../BaseLocators";
import {Locator} from "@playwright/test"

export class CreateArticlePageLocators extends BaseLocators {
    readonly articleTitleInputField: Locator = this.page.getByTestId("editor-title")
    readonly articleDescriptionInputField: Locator = this.page.getByTestId("editor-description")
    readonly articleBodyInputField: Locator = this.page.getByTestId("editor-body")
    readonly articleSubmitButton: Locator = this.page.getByTestId("editor-submit")

}