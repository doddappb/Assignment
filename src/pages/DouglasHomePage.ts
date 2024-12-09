import {CustomWorld} from "../support/world"
import { Page } from 'playwright';

export class DouglasHomePage{ 
    readonly page:Page
    
    private userName="#user-name"
    private password="#password"

   

     constructor(page:Page){
        this.page=page
    
    }

    async enterUserNameAndPassword(){
        // let password=  await this.page!.locator("#password")
        await this.page.fill(this.userName,"standard_user")
        await this.page.fill(this.password,"secret_sauce")
        // this.page?.waitForSelector(await password)
    // let userName=  await this.page!.'locator'("#user-name");
    // await userName?.fill("standard_user")
    // await password?.fill("secret_sauce")
  
}

     
}