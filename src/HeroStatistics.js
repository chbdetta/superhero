import React, { useMemo } from "react";
import AutoResize from "./util/AutoResize";
import BarChart from "./BarChart";

export default function HeroStatistics({ heroes, width }) {
  // Compute the date from heroes
  const data = useMemo(() => {
    if (heroes.length >= 2) {
      return Object.keys(heroes[0].powerstats).map(key => {
        const data = {
          groupKey: key
        };

        heroes.forEach(hero => {
          data[hero.id] = parseInt(hero.powerstats[data.groupKey]) || 0;
        });

        return data;
      });
    }
    return null;
  }, [heroes]);

  const heroInfo = useMemo(
    () =>
      heroes.reduce(
        (obj, hero) =>
          Object.assign(obj, {
            [hero.id]: {
              id: hero.id,
              image: hero.image && hero.image.url,
              name: hero.name
            }
          }),
        {}
      ),
    [heroes]
  );

  return (
    <>
      <h4>Comparison</h4>
      {data == null ? (
        <p>Choose at least two heroes to compare their power.</p>
      ) : (
        <AutoResize>
          {({ width }) => (
            <BarChart
              width={width}
              height={600}
              data={data}
              subGroupData={heroInfo}
            />
          )}
        </AutoResize>
      )}
    </>
  );
}
