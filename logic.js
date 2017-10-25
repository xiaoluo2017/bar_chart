let dataset = [];
const w = 1140;
const h = 680;
const padding = 60;
const svg = d3.select(".root")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

$(document).ready(function() {
  var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  $.getJSON(url, function(json) {
    dataset = json.data;

  // Scale the range of the data
  const xScale = d3.scaleLinear()
                   .domain([0, dataset.length - 1])
                   .range([padding, w - padding]);            

  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(dataset, (d) => d[1])])
                   .range([h - padding, padding]); 

  // Define the div for the tooltip
  const div = d3.select(".root")
                .append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0);

  // Set up svg
  svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("x", (d, i) => xScale(i))
     .attr("y",(d) => yScale(d[1]))
     .attr("width", 4)
     .attr("height", (d) => {
       return h - padding - yScale(d[1]);
      })
      .attr("fill", "steelblue")
      .attr("class", "bar")
      .on("mouseover", function(d) {		
        div.transition()		
           .duration(200)		
           .style("opacity", .9);		
        div.html('<span class="value">$' + d[1] + " Billion</span>" + '</br><span class="date">' + d[0] + "</span>")	
           .style("left", (d3.event.pageX) + "px")		
           .style("top", (d3.event.pageY - 28) + "px");	
        })					
      .on("mouseout", function(d) {		
        div.transition()		
           .duration(500)		
           .style("opacity", 0);	
      });

  svg.append("text")
     .attr("x", (w / 2))             
     .attr("y", 60)
     .attr("text-anchor", "middle")  
     .style("font-size", "2.5em") 
     .style("fill", "steelblue")
     .text("Gross Domestic Product");
 
  // Add x Axis
  const xAxisScale = d3.scaleLinear()
                       .domain([d3.min(dataset, (d) => {
                         return d[0].split("-")[0];
                       }), d3.max(dataset, (d) => {
                         return d[0].split("-")[0];
                       })])
                       .range([padding, w - padding]);

  const xAxis = d3.axisBottom(xAxisScale);

  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(0," + (h - padding) + ")")
     .call(xAxis);

  // Add y Axis
  const yAxis = d3.axisLeft(yScale);
 
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + padding +", 0)")
     .call(yAxis);

  // Add y Axis text label
  svg.append("text")
     .attr("class", "axis")
     .attr("text-anchor", "middle") 
     .attr("transform", "translate(" + (padding + 20) +","+ 160 + ")rotate(-90)") 
     .text("Gross Domestic Product, USA");
  });
});
