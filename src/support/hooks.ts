import { After, Before, AfterAll, BeforeAll } from '@cucumber/cucumber';
import { CustomWorld } from "./world"






Before({ timeout: 1000 * 100 }, async function (this: CustomWorld) {

    await this.setup()


})

After(async function name(this: CustomWorld) {

    await this.close()

})