import * as fs from "fs"


export class JsonManager {

    async readJsonfile(fileName:string):Promise<any>{
        return await fs.readFileSync(fileName,"utf-8")
    }

    async writeJsonData(fileName:string,data:string):Promise<any>{
        try{
            return  fs.writeFileSync(fileName,data,)
        }catch(e){

            throw new Error(`Error occured while writing json data into ${fileName}`)

        }
       
    }
} 