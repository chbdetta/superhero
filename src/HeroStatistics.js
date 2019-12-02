import React, { useState, useRef, useEffect, useMemo } from "react";
import classes from "./HeroStatistics.module.scss";
import * as d3 from "d3";

export default function HeroStatistics({ heroes, width }) {
  const chartRef = useRef(null);
  const height = 600;

  // Compute the date from heroes
  const data = useMemo(() => {
    if (heroes.length >= 2) {
      return Object.keys(heroes[0].powerstats).map(key => {
        const data = {
          powerName: key
        };

        heroes.forEach(hero => {
          data[hero.name] = parseInt(hero.powerstats[data.powerName]) || 0;
        });

        return data;
      });
    }
    return null;
  }, [heroes]);

  // Update the chart
  useEffect(() => {
    if (data == null) {
      return;
    }

    const svg = d3.select(chartRef.current);
    const margin = { top: 10, right: 10, bottom: 20, left: 40 };
    const keys = Object.keys(data[0]).slice(1);
    const groupKey = Object.keys(data[0])[0];

    const color = d3
      .scaleOrdinal()
      .range([
        "#98abc5",
        "#8a89a6",
        "#7b6888",
        "#6b486b",
        "#a05d56",
        "#d0743c",
        "#ff8c00"
      ]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))])
      .nice()
      .rangeRound([height - margin.bottom, margin.top]);

    const x0 = d3
      .scaleBand()
      .domain(data.map(d => d[groupKey]))
      .rangeRound([margin.left, width - margin.right])
      .paddingInner(0.1);

    const x1 = d3
      .scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    const xAxis = g =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick text").style("font-size", "12px"));

    const yAxisLabelWidth = 20;
    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left - yAxisLabelWidth},0)`)
        .call(
          d3
            .axisRight(y)
            .ticks(null, "s")
            .tickFormat(d => d)
            .tickSize(width - margin.left - margin.right + yAxisLabelWidth)
        )
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .selectAll(".tick:not(:first-of-type) line")
            .attr("stroke-opacity", 0.5)
            .attr("stroke-dasharray", "2,2")
        )
        .call(g =>
          g
            .selectAll(".tick text")
            .attr("x", 3)
            .attr("dy", -4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
        );

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);

    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
      .selectAll("rect")
      .data(d => keys.map(key => ({ key, value: d[key] })))
      .join("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.key));

    return () => {
      svg.html("");
    };
  }, [data, height, width]);

  return (
    <>
      <h4>Comparison</h4>
      {data == null ? (
        <p>Choose at least two heroes to compare their power.</p>
      ) : (
        <div className={classes.Chart}>
          <svg ref={chartRef} width={width} height={height}></svg>
        </div>
      )}
    </>
  );
}
