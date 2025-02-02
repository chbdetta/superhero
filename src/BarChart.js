import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function BarChart({ width, height, data, subGroupData }) {
  const chartRef = useRef(null);

  // Update the chart
  useEffect(() => {
    if (data == null) {
      return;
    }

    const svg = d3.select(chartRef.current);
    const margin = { top: 60, right: 10, bottom: 20, left: 40 };
    const groupKey = "groupKey";
    const keys = Object.keys(data[0]).filter(k => k !== groupKey);

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

    const imageSize = 40;

    svg
      .append("defs")
      .selectAll("pattern")
      .data(Object.values(subGroupData))
      .join("pattern")
      .attr("id", d => `image-${d.id}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${imageSize} ${imageSize}`)
      .append("image")
      .attr("width", imageSize)
      .attr("href", d => d.image);

    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
      .selectAll("g")
      .data(d => keys.map(key => ({ key, value: d[key] })))
      .join("g")
      .attr("transform", d => `translate(${x1(d.key)}, ${y(d.value)})`)
      .call(g =>
        g
          .append("rect")
          .attr("width", x1.bandwidth())
          .attr("height", d => y(0) - y(d.value))
          .attr("fill", d => color(d.key))
      )
      .call(g =>
        g
          .append("circle")
          .attr("fill", d => `url(#image-${d.key})`)
          .attr("r", imageSize / 2)
          .attr("cx", x1.bandwidth() / 2)
          .attr("cy", -10 - imageSize / 2)
      );

    return () => {
      svg.html("");
    };
  }, [data, subGroupData, height, width, chartRef]);

  return <svg ref={chartRef} width={width} height={height} />;
}
