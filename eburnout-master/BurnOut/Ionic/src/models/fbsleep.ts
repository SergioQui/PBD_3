// del tiempo en cama se le puede restart el tiempo awake para presentar en pantalla
export class FBSleep{
    constructor(
        public timeinbed:number,
        public starttime:string,
        public endtime:string,
        public minutesawake:number
    ){}
}