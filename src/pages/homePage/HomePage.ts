import { BasePage } from "../BasePage";
import { HomePageLocators } from "./HomePageLocators";

export class HomePage extends BasePage {
    readonly locators: HomePageLocators = new HomePageLocators(this.page)
}