import React, { useState, useMemo } from "react";
import immer from "immer";
import classes from "./App.module.scss";
import SearchBar from "./SearchBar";
import HeroList from "./HeroList";
import HeroStatistics from "./HeroStatistics";

function App() {
  const [savedHeroList, setSavedHeroList] = useState([]);
  const savedHeroIds = useMemo(() => savedHeroList.map(h => h.id), [
    savedHeroList
  ]);
  const comparingHeroes = savedHeroList.filter(hero => hero.isComparing);

  const handleHeroSelect = hero => {
    if (savedHeroIds.indexOf(hero.id) !== -1) {
      setSavedHeroList(savedHeroList.filter(h => h.id !== hero.id));
    } else {
      if (hero != null && hero.id != null) {
        setSavedHeroList([...savedHeroList, hero]);
      }
    }
  };

  const handleHeroCompare = hero => {
    setSavedHeroList(
      immer(savedHeroList, v => {
        const target = v.find(({ id }) => id === hero.id);
        if (target) {
          target.isComparing = !target.isComparing;
        }
      })
    );
  };

  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <SearchBar
          className={classes.Search}
          onHeroSelect={handleHeroSelect}
          savedHeroIds={savedHeroIds}
        />
      </header>
      <main className={classes.AppMain}>
        <div className={classes.SidePanel}>
          <HeroList
            heroes={savedHeroList}
            onHeroCompared={handleHeroCompare}
            onHeroUnSaved={handleHeroSelect}
          />
        </div>
        <div className={classes.MainPanel}>
          <HeroStatistics heroes={comparingHeroes} />
        </div>
      </main>
    </div>
  );
}

export default App;
