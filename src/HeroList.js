import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeroCard from "./HeroCard";
import classes from "./HeroList.module.scss";

export default function HeroList({ heroes, onHeroCompared, onHeroUnSaved }) {
  const handleClick = onHeroCompared;

  return (
    <div>
      <h4>Hero List</h4>
      {heroes.length === 0 && (
        <p>
          You don't have any saved heroes. Use the search box to add some heroes
          to your list
        </p>
      )}
      <ul>
        {heroes.map(hero => (
          <li key={hero.id} className={classes.Item}>
            <button
              className={classes.RemoveBtn}
              onClick={() => onHeroUnSaved(hero)}
            >
              <FontAwesomeIcon icon="trash" />
            </button>
            <div className={classes.Info} onClick={() => handleClick(hero)}>
              <HeroCard hero={hero} />
            </div>
            <div>
              <label className={classes.State}>
                compare
                <input
                  name="compare"
                  type="checkbox"
                  checked={hero.isComparing || false}
                  onChange={() => handleClick(hero)}
                />
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

HeroList.defaultProps = {
  heroes: []
};
