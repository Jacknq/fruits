

export  class Fruit {
    constructor(){ 
        this.isFruit = true;
        this.color = "#176172";
        this.expires = new Date((new Date()).getTime()
         + 365*24*60*60*1000).toISOString().substr(0, 10);
    }
    color: string;
    description!: string;
    expires: string;
    id!: number;
    image!: string;
    isFruit: boolean;
    name!: string;
    price!: string;
    taste!: string;
}