import { Page } from "@playwright/test"
import { url } from "inspector"
import { CustomHelper } from "./CustomHelper"

export class CustomPage implements CustomHelper {
    page: Page

    static instance: CustomPage


    constructor(page: Page) {
        this.page = page
    }

    public static getInstance(page: Page):CustomHelper {

        if (!CustomPage.instance) {
            CustomPage.instance = new CustomPage(page);
        }

        return CustomPage.instance


    }

    async open(url: string): Promise<void> {
        await this.page.goto(url)

    }

    async dragAndDrop(source: any, target: any): Promise<void> {

        await this.page?.mouse.move(source!.x + source!.width / 2, source!.y + source!.height / 2)
        await this.page?.mouse.down()
        await this.page?.mouse.move(target!.x + target!.width / 2, target!.y + target!.height / 2)
        await this.page?.mouse.up()
    }

    async moveTo(source: any): Promise<void> {

        await this.page?.mouse.move(source!.x + source!.width / 2, source!.y + source!.height / 2)
        await this.page?.mouse.up()
    }





}