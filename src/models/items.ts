class Item {
  id:string;
  imgUrl: string;
  name: string;
  price: number;
  description: string;

  constructor(id:string,imgUrl:string,name:string, price:number,description:string){
    this.id = id;
    this.imgUrl = imgUrl;
    this.name =  name;
    this.price = price;
    this.description = description;
  }

}
export default Item;
