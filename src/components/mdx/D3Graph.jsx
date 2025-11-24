import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Graph = ({ data = [10, 25, 15, 30, 45, 20, 50], color = "#00ff9d" }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const width = 600;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };

        svg.selectAll("*").remove();

        const x = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height - margin.bottom, margin.top]);

        const line = d3.line()
            .x((d, i) => x(i))
            .y(d => y(d))
            .curve(d3.curveMonotoneX);

        // Add grid lines (cyber style)
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(data.length).tickSize(-height + margin.top + margin.bottom).tickFormat(""))
            .attr("stroke", "#333")
            .attr("stroke-opacity", 0.3);

        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(5).tickSize(-width + margin.left + margin.right).tickFormat(""))
            .attr("stroke", "#333")
            .attr("stroke-opacity", 0.3);

        // Add the line path
        const path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 2)
            .attr("d", line);

        // Animate the path
        const totalLength = path.node().getTotalLength();
        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .ease(d3.easeCubicOut)
            .attr("stroke-dashoffset", 0);

        // Add dots
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", (d, i) => x(i))
            .attr("cy", d => y(d))
            .attr("r", 4)
            .attr("fill", "#000")
            .attr("stroke", color)
            .attr("stroke-width", 2)
            .style("opacity", 0)
            .transition()
            .delay((d, i) => i * 100 + 1000)
            .duration(500)
            .style("opacity", 1);

    }, [data, color]);

    return (
        <div className="w-full overflow-x-auto my-8 border border-cyber-border bg-cyber-black p-4">
            <svg
                ref={svgRef}
                viewBox="0 0 600 300"
                className="w-full h-auto"
                style={{ maxWidth: '100%' }}
            />
        </div>
    );
};

export default D3Graph;
