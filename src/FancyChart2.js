import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

const FancyChart2 = ({ data }) => {
  const width = 600,
    height = 300,
    margin = { left: 120, top: 20, bottom: 20, right: 20 },
    iwidth = width - margin.left - margin.right,
    iheight = height - margin.top - margin.bottom;

  const svgRef = useRef();

  const x = d3.scaleLinear().range([0, iwidth]),
    y = d3.scaleBand().range([iheight, 0]).padding(0.1),
    r = d3.scaleSqrt().range([1, 20]);

  x.domain([0, d3.max(data, (d) => d.age)]);
  r.domain([0, d3.max(data, (d) => d.age)]);
  y.domain(new Set(data.map((d) => d.name).values()));

  return (
    <div className="FancyChart2">
      <svg ref={svgRef} width={width} height={height}>
        <g id="points">
          {data.map((d) => (
            <rect
              x="0"
              y={y(d.name)}
              width={x(d.age)}
              height={y.bandwidth()}
            ></rect>
          ))}
        </g>
      </svg>
    </div>
  );
};

FancyChart2.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FancyChart2;
