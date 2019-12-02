import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { search_heros } from "./api";
import classnames from "classnames";
import classes from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HeroCard from "./HeroCard";

function SearchBar({ onHeroSelect, savedHeroIds, className }) {
  const [heroes, setHeroes] = useState([]);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [debouncedQuery] = useDebounce(value.trim(), 200);

  const handleClick = onHeroSelect;
  const resultsShown = focused && (error || heroes.length !== 0);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const heroes = await search_heros(debouncedQuery);
        setHeroes(heroes);
        setError(null);
      } catch (e) {
        setError(e.message);
      }
    };

    if (debouncedQuery !== "") {
      fetchHeroes();
    } else {
      setError(null);
      setHeroes([]);
    }
  }, [debouncedQuery]);

  return (
    <div
      className={classnames(className, classes.SearchBar)}
      tabIndex={-1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <label>Search Heroes: </label>
      <input
        className={classes.SearchInput}
        name="hero"
        value={value}
        autoComplete="off"
        placeholder="Hero name keyword"
        onChange={({ target }) => setValue(target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <div
        className={classnames(classes.SearchResults, {
          [classes.hidden]: !resultsShown
        })}
      >
        {error ? (
          <div className={classes.Error}>
            <span>
              <FontAwesomeIcon icon="exclamation-triangle" />
            </span>
            {error}
          </div>
        ) : (
          <ul>
            {heroes.map(hero => (
              <li
                key={hero.id}
                onClick={() => handleClick(hero)}
                className={classes.SearchItem}
              >
                <HeroCard hero={hero} />
                {savedHeroIds.indexOf(hero.id) !== -1 ? (
                  <span className={classes.State}>Saved</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
