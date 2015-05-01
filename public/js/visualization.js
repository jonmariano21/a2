var margin = {top: 20, right: 20, bottom: 100, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

//MARIANO:
var igArray = [];
//var fmtPercent = d3.format(".0%");

//define scale of x to be from 0 to width of SVG, with .1 padding in between
var scaleX = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

//define scale of y to be from the height of SVG to 0
var scaleY = d3.scale.linear()
  .range([height, 0]);

//define axes
var xAxis = d3.svg.axis()
  .scale(scaleX)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(scaleY)
  .orient("left");
//  .tickFormat(fmtPercent);//MARIANO

//MARIANO:
//just the TIP
var mytip = d3.tip()
	.attr('class', 'd3-tip')
	.html(function(d){ 
		return "<p><b>" + d.username + "</b></p> <p><b style='color:red'>" + d.counts.media + "</b> Photos on IG</p>"; 
	});

//create svg
var svg = d3.select("center").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
  
svg.call(mytip);//MARIANO:

  
//get json object which contains media counts
d3.json('/igMediaCounts', function(error, data) {
  var parent = document.getElementById("parent");
  var child = document.getElementById("prog");
  
  console.log("hello");
  igArray = data; 
  
  
  //set domain of x to be all the usernames contained in the data
  scaleX.domain(data.users.map(function(d) { return d.username; }));
  //set domain of y to be from 0 to the maximum media count returned
  scaleY.domain([0, d3.max(data.users, function(d) { return d.counts.media; })]);

  //set up x axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")") //move x-axis to the bottom
    .call(xAxis)
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function(d) {
      return "rotate(-65)" 
    });

  //set up y axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 9)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Number of Photos");

  //set up bars in bar graph
  svg.selectAll(".bar")
    .data(data.users)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return scaleX(d.username); })
    .attr("width", scaleX.rangeBand())
    .attr("y", function(d) { return scaleY(d.counts.media); })
    .attr("height", function(d) { return height - scaleY(d.counts.media); })
    .on('mouseover', mytip.show)
    .on('mouseout', mytip.hide);
    
  //MARIANO:  
  /*
  d3.select("input").on("change", change);

  var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  }, 2000);

  function change() {
    clearTimeout(sortTimeout);

    // Copy-on-write since tweens are evaluated after a delay.
    var x0 = scaleX.domain(data.sort(this.checked
        ? function(a, b) { return b.counts.media - a.counts.media; }
        : function(a, b) { return d3.ascending(a.counts.media, b.counts.media); })
        .map(function(d) { return d.username; }))
        .copy();

    svg.selectAll(".bar")
        .sort(function(a, b) { return x0(a.username) - x0(b.username); });

    var transition = svg.transition().duration(750),
        delay = function(d, i) { return i * 50; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x0(d.username); });

    transition.select(".x.axis")
        .call(xAxis)
      .selectAll("g")
        .delay(delay);
  }
  */
  parent.remove(child);
});//close d3.json

function sortGraph(){
	
  document.getElementById("b").disabled = "true";
	
  igArray.users.sort(function(a,b){ return (a.counts.media) - (b.counts.media) });
  d3.select("svg").remove();
	
  var svg = d3.select("center").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
  //MARIANO:	
  svg.call(mytip);//MARIANO:

		
  //set domain of x to be all the usernames contained in the data
  scaleX.domain(igArray.users.map(function(d) { return d.username; }));
  //set domain of y to be from 0 to the maximum media count returned
  scaleY.domain([0, d3.max(igArray.users, function(d) { return d.counts.media; })]);

  //set up x axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")") //move x-axis to the bottom
    .call(xAxis)
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function(d) {
      return "rotate(-65)" 
    });

  //set up y axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Number of Photos");

  //set up bars in bar graph
  svg.selectAll(".bar")
    .data(igArray.users)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return scaleX(d.username); })
    .attr("width", scaleX.rangeBand())
    .attr("y", function(d) { return scaleY(d.counts.media); })
    .attr("height", function(d) { return height - scaleY(d.counts.media); })
    .on('mouseover', mytip.show)
    .on('mouseout', mytip.hide);
	

}//close sortGraph()















