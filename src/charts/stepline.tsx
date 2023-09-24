/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./stepline.css";
import BoxDiagramImage from "../assets/image/box_diagram.png";
import ReactTooltip from "react-tooltip";

export interface DataPoint {
  time: number;
  status: string;
  from: number;
  to: number;
  day: string;
}

interface SteplineChartProps {
  data: DataPoint[];
  height?: string;
}

const SteplineChart: React.FC<SteplineChartProps> = ({
  data,
  height = "200px",
}) => {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const margin = { top: 20, right: 10, bottom: 0, left: 50 };
      const width = chartRef.current.clientWidth - margin.left - margin.right;
      const height = chartRef.current.clientHeight - margin.top - margin.bottom;

      // Scale functions
      const xScale = d3.scaleLinear().domain([0, 24]).range([0, width]);
      const yScale = d3
        .scaleBand()
        .domain(data.map((d) => d.status))
        .range([height, 0])
        .padding(0.1);

      // Create the chart
      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      // .on("mousemove", handleMouseMove); // автоматически обновляем линию при движении курсора;

      // Create x-axis
      const xAxis = d3.axisTop(xScale).ticks(24);
      svg
        .append("g")
        .attr("class", "x")
        .attr("transform", `translate(0, 0)`)
        .attr("fill", "transparent")
        .call(xAxis);

      const cellWidth = width / 24;
      const cellHeight = height / 4;

      // Create cells
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 4; j++) {
          svg
            .append("rect")
            .attr("class", "yacheyka")
            .attr("x", i * cellWidth) // x coordinate of the first column
            .attr("y", j * cellHeight) // y coordinate of the first row
            .attr("width", cellWidth)
            .attr("height", cellHeight)
            .attr("fill", "transparent");

          svg
            .append("image")
            .attr("xlink:href", BoxDiagramImage)
            .attr("x", i * cellWidth)
            .attr("y", j * cellHeight)
            .attr("width", cellWidth)
            .attr("height", cellHeight);
        }
      }

      // Create rectangles
      svg
        .append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "rect")
        .attr("x", (d) => xScale(d.from))
        .attr("y", 0)
        .attr("width", (d) => xScale(d.to) - xScale(d.from))
        .attr("height", height)
        .attr("fill", "transparent")
        .attr("data-tip", (d) => `Status: ${d.status}, Time: ${d.time}`)
        .attr("data-for", "chart-tooltip");

      // создаем линию
      svg
        .append("line")
        .attr("class", "cursor-line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", height)
        .style("stroke", "red")
        .style("stroke-width", "3px")
        .style("pointer-events", "none")
        .attr("opacity", 0.5)
        .attr("display", "none"); // начально скрываем линию
      // .attr("ref", lineRef); // сохраняем ссылку на элемент линии

      // Create stepline path
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "rgb(44, 65, 93)")
        .attr("stroke-width", 4)
        .attr("class", "line")
        .attr(
          "d",
          d3
            .line()
            .curve(d3.curveStepAfter)
            .x((d) => xScale(d.time))
            .y((d) => yScale(d.status) + margin.top)
        );

      ReactTooltip.rebuild();
    }
  }, [data]);

  return (
    <>
      <svg
        width={"2000px"}
        height={height}
        ref={chartRef}
        style={{ overflow: "visible" }}
      ></svg>
      <ReactTooltip effect="float" id="chart-tooltip" place="bottom" />
    </>
  );
};

export default SteplineChart;
