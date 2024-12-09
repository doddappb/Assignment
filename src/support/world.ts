import {setWorldConstructor} from "@cucumber/cucumber"
import {Browser,Page,chromium,request} from "@playwright/test"
import { Context } from "vm"
 const config=require("../config")


export class CustomWorld {
    browser:Browser|null=null
    public page:Page|null=null
    public context:Context|null=null
    public requestContext:Context|null=null

    static instance:CustomWorld

    static async getInstance(){

        if(!CustomWorld.instance){
            CustomWorld.instance=new CustomWorld()
        }
        return CustomWorld.instance
    }
    
    


    async setup(){
    this.browser=await chromium.launch({headless:config.heasless})
    this.context=await this.browser.newContext()
    this.page=await this.context.newPage()
    this.requestContext=await request.newContext()

    await this.context.setDefaultTimeout(config.setDefaultTimeout)
    await this.context.setDefaultNavigationTimeout(config.setDefaultNavigationTimeout)


    }

    async close(){
        if(this.browser!==null){
            this.browser.close()
        }
        
    
        }

}
setWorldConstructor(CustomWorld)
