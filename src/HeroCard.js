import React from "react";
import classes from "./HeroCard.module.scss";

export default function HeroCard({ hero }) {
  return (
    <div className={classes.HeroCard}>
      <div className={classes.Image}>
        <img src={hero.image.url} alt="hero" />
      </div>
      <div>
        <div>
          <b>{hero.name}</b>
        </div>
        <div>{hero.biography.publisher}</div>
      </div>
    </div>
  );
}
