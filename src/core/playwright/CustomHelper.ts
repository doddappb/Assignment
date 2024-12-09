export interface CustomHelper{
    open(url:string):Promise<void>
    dragAndDrop(source: any, target: any):Promise<void>
    moveTo(source: any):Promise<void>
}