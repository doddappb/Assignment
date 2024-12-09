

const { Given, Then, When } = require("@cucumber/cucumber")
import { expect } from "@playwright/test"
import { CustomWorld } from "../support/world"
import { DouglasHomePage } from "../pages/DouglasHomePage"
import { CustomPage } from "../core/playwright/CustomPage"
import { CustomHelper } from "../core/playwright/CustomHelper"
import { JsonManager } from "../utility/JsonManager"

let douglasHomePage: DouglasHomePage
let page:CustomHelper
let json=new JsonManager()


Given("the user navigate to douglas home page", { timeout: 1000 * 100 }, async function (this: CustomWorld) {
  douglasHomePage = new DouglasHomePage(this.page!)
    page = CustomPage.getInstance(this.page!)

  await page.open("https://www.douglas.de/de")


})


Then("the user accept the cookies", { timeout: 1000 * 100 }, async function (this: CustomWorld) {

  await this.page?.waitForSelector('button:has-text("ALLE ERLAUBEN")')
  await this.page?.click('button:has-text("ALLE ERLAUBEN")')

})

Then("the user select the PARFUM menu from menu bar", { timeout: 1000 * 100 }, async function (this: CustomWorld) {

  let source = await this.page?.locator("//nav[starts-with(@class,'navigation-main')]//a[text()='PARFUM']").boundingBox()
  await page.moveTo(source)
})




Then("the user get the product list based on:", { timeout: 1000 * 100 }, async function (this: CustomWorld, dataTable: any) {
  await this.page?.waitForSelector(".navigation-backdrop .navigation-main__content");

let subMenuList = await this.page?.locator(".navigation-backdrop .navigation-main__content .navigation-main__column a");
let elements = await subMenuList!.all(); // Fetch all elements only once
let elementTexts = await Promise.all(elements.map(ele => ele.innerText())); // Get all texts at once

let arr: any[] = [];

for (let val of dataTable.hashes()) {
  let obj: { [Key: string]: any } = {};

  // Check if the item exists in the list before clicking
  const index = elementTexts.findIndex(text => text.toLocaleLowerCase() === val["item"].toLocaleLowerCase());
  
  if (index !== -1) {
    let ele = elements[index];
    await ele.click();

    // Wait for the product list to be visible
    await this.page!.waitForSelector("#productlisting", { timeout: 50000 }); // Timeout in case it's too long

    // Extract product details
    let productListEle = await this.page?.$$(`#productlisting .ui-grid.product-grid-row div[class^="product-grid-column"] a[data-testid="details-link"] div[class="product-info__info-wrapper"] div[class="text top-brand"]`);
    let productList = await Promise.all(productListEle!.map(ele => ele.textContent()));

    obj[val["item"]] = productList;
    arr.push(obj);
    let source = await this.page?.locator("//nav[starts-with(@class,'navigation-main')]//a[text()='PARFUM']").boundingBox()
  await page.moveTo(source)
      }
    }
    await json.writeJsonData("productlist.json",JSON.stringify(arr))
    console.log(arr)
  })

