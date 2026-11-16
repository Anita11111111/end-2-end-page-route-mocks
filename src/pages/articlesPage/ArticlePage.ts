import {BasePage} from "../BasePage"
import { ArticlePageLocators } from "./ArticlePageLocator"    

export class ArticlesPage extends BasePage {
    readonly locators: ArticlePageLocators = new ArticlePageLocators(this.page)

}