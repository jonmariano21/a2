
var m = {top: 60, right: 20, bottom: 100, left: 100};
var w = 960 - m.right - m.left;
var h = 500 - m.top - m.bottom;
    
var igArray = [];

var format = d3.format(",.0f");

var x = d3.scale.linear().range([0, w]),
    y = d3.scale.ordinal().rangeRoundBands([0, h], .1);

var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h),
    yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);


var mytip = d3.tip()
	.attr('class', 'd3-tip')
	.html(function(d){ 
		return "<p><b>" + d.username + "</b> is following</p> <p><b style='color:blue'>" + d.counts.follows + "</b> People on IG</p>"; 
	});


var svg = d3.select("center").append("svg")
    .attr("width", w + m.right + m.left)
    .attr("height", h + m.top + m.bottom)
  .append("g")
    .attr("transform", "translate(" + m.left + "," + m.top + ")");

svg.call(mytip);//MARIANO:


d3.json("/igMediaCounts", function(error, data) {
  var parent = document.getElementById("parent");
  var child = document.getElementById("prog");

  igArray = data;

  // Parse numbers, and sort by value.
  //data.forEach(function(d) { d.counts.media = +d.counts.media; });
  //igArray.sort(function(a, b) { return b.counts.media - a.counts.media; });

  // Set the scale domain.
  x.domain([0, d3.max(data.users, function(d) { return d.counts.follows; })]);
  y.domain(data.users.map(function(d) { return d.username; }));




  var bar = svg.selectAll("g.bar2")
      .data(data.users)
      .enter().append("g")
      .attr("class", "bar2")
      .attr("transform", function(d) { return "translate(0," + y(d.username) + ")"; })
      .on('mouseover', mytip.show)
      .on('mouseout', mytip.hide);

  bar.append("rect")
      .attr("width", function(d) { return x(d.counts.follows); })
      .attr("height", y.rangeBand());

  bar.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return x(d.counts.follows); })
      .attr("y", y.rangeBand() / 2)
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return format(d.counts.follows); });

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  parent.remove(child);
});




function sortGraph(){
	
  document.getElementById("b").disabled = "true";
  	
  igArray.users.sort(function(a,b){ return (b.counts.follows) - (a.counts.follows) });
  d3.select("svg").remove();



  var svg = d3.select("center").append("svg")
    .attr("width", w + m.right + m.left)
    .attr("height", h + m.top + m.bottom)
  .append("g")
    .attr("transform", "translate(" + m.left + "," + m.top + ")");

  svg.call(mytip);//MARIANO:

  x.domain([0, d3.max(igArray.users, function(d) { return d.counts.follows; })]);
  y.domain(igArray.users.map(function(d) { return d.username; }));

  var bar = svg.selectAll("g.bar2")
      .data(igArray.users)
    .enter().append("g")
      .attr("class", "bar2")
      .attr("transform", function(d) { return "translate(0," + y(d.username) + ")"; })
      .on('mouseover', mytip.show)
	  .on('mouseout', mytip.hide);

  bar.append("rect")
      .attr("width", function(d) { return x(d.counts.follows); })
      .attr("height", y.rangeBand());

  bar.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return x(d.counts.follows); })
      .attr("y", y.rangeBand() / 2)
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return format(d.counts.follows); });

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

}





