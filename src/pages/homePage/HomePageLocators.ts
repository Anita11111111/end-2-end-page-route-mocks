import { BaseLocators } from "../BaseLocators";
import { Locator } from "@playwright/test"

export class HomePageLocators extends BaseLocators {
    readonly globalFeedTab: Locator = this.page.getByTestId('feed-tab-global')
    readonly previewTitles: Locator = this.page.getByTestId('preview-title')
}