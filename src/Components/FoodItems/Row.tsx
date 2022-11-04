import React from "react";
import ItemModel from "../../models/items";
import Items from "./Items";
import classes from "./Row.module.css";

const Row: React.FC<{ title: string, mealItems:ItemModel[] }> = (props) => {
  return (
    <div className={classes.row}>
      <h1 className={classes.title}>{props.title}</h1>
      <div className={classes.itemlist}>
        {props.mealItems?.map((item) => (
          <Items key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Row;
