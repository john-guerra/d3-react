import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

const FancyChart = ({ data }) => {
  const width = 600,
    height = 300,
    margin = { left: 120, top: 20, bottom: 20, right: 20 },
    iwidth = width - margin.left - margin.right,
    iheight = height - margin.top - margin.bottom;

  const svgRef = useRef();

  const x = d3.scaleLinear().range([0, iwidth]),
    y = d3.scaleBand().range([iheight, 0]).padding(0.1),
    r = d3.scaleSqrt().range([1, 20]);

  useEffect(() => {
    // only called when the component has rendered.

    const svg = d3.select(svgRef.current);
    console.log("value", svgRef.current);

    x.domain([0, d3.max(data, (d) => d.age)]);
    r.domain([0, d3.max(data, (d) => d.age)]);
    y.domain(new Set(data.map((d) => d.name).values()));

    console.log("domains", x.domain(), y.domain());

    const g = svg
      .selectAll("#points")
      .data([0])
      .join("g")
      .attr("id", "points")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    g.selectAll("rect")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("width", 0)
            .attr("height", y.bandwidth())
            .attr("y", (d) => y(d.name))
            .attr("x", 0)
            .call((update) =>
              update
                .transition()
                .duration(500)
                .attr("width", (d) => x(d.age))
            ),
        (update) =>
          update
            .attr("height", y.bandwidth())
            .attr("y", (d) => y(d.name))
            .attr("x", 0)
            .call((update) =>
              update
                .transition()
                .duration(500)
                .attr("width", (d) => x(d.age))
            )
      );

    g.selectAll(".xAxis")
      .data([0])
      .join("g")
      .attr("class", "xAxis")
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.selectAll(".yAxis")
      .data([0])
      .join("g")
      .attr("class", "yAxis")
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <div className="FancyChart">
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

FancyChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FancyChart;
