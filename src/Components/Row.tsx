import React from "react";
import Items from "./Items";
import classes from "./Row.module.css";
const ItemsArr: {
  imgUrl: string;
  name: string;
  price: number;
  description: string;
}[] = [
  {
    imgUrl: "he he",
    name: "Zinger burger",
    price: 2.55,
    description: "he he he he dec",
  },
  {
    imgUrl: "he he",
    name: "Zinger burger",
    price: 2.55,
    description: "he he he he dec",
  },
  {
    imgUrl: "he he",
    name: "Zinger burger",
    price: 2.55,
    description: "he he he he dec",
  },
  {
    imgUrl: "he he",
    name: "Zinger burger",
    price: 2.55,
    description: "he he he he dec",
  },
  {
    imgUrl: "he he",
    name: "Zinger burger",
    price: 2.55,
    description: "he he he he dec",
  },
];

const Row: React.FC<{ title: string }> = (props) => {
  return (
    <div>
      <h1 className={classes.title}>{props.title}</h1>
      <div className={classes.itemlist}>
        {ItemsArr.map((item, index) => (
          <Items key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Row;
