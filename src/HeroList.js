import React, { useState } from "react";
import HeroCard from "./HeroCard";
import classes from "./HeroList.module.scss";

export default function HeroList({ heroes, onHeroCompared }) {
  const handleClick = onHeroCompared;

  return (
    <div>
      <ul>
        {heroes.map(hero => (
          <li
            key={hero.id}
            onClick={() => handleClick(hero)}
            className={classes.Item}
          >
            <HeroCard hero={hero} />
            {hero.isComparing ? (
              <span className={classes.State}>Comparing</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

HeroList.defaultProps = {
  heroes: []
};
