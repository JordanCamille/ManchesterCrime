  angular.module('appCrimeMaps')
  .directive('histoChart', function ($parse) {
       //explicitly creating a directive definition variable
       //this may look verbose but is good for clarification purposes
       //in real life you'd want to simply return the object {...}
       var directiveDefinitionObject = {
           //We restrict its use to an element
           //as usually  <bars-chart> is semantically
           //more understandable
           restrict: 'E',
           //this is important,
           //we don't want to overwrite our directive declaration
           //in the HTML mark-up
           replace: false,
           //our data source would be an array
           //passed thru chart-data attribute         
           link: function (scope, element, attrs) {

  
             scope.$watch('dataHisto', function() {

              var scopeData =scope.dataHisto;


    if(scopeData != null){
      

  var margin = {top: 20, right: 160, bottom: 35, left: 50};

  var width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var svg = d3.select(element[0])
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      var data = [scope.dataHisto.month.January,scope.dataHisto.month.February,
              scope.dataHisto.month.March,scope.dataHisto.month.April,
              scope.dataHisto.month.May,scope.dataHisto.month.June,
              scope.dataHisto.month.July,scope.dataHisto.month.August,
              scope.dataHisto.month.September,scope.dataHisto.month.October,
              scope.dataHisto.month.November,scope.dataHisto.month.December
  ];

 
  var formatTime = d3.time.format("%B");
  
  var dataset = d3.layout.stack()(["ASB","BU","VC","VSO","OT","CDA","PO","DRU","ROB","SHO","POW","TOP","OC","BT"]
    .map(function(crimeType) {
    return data.map(function(d) {
    

      return {x: d.month, y: +d[crimeType]};
    });
  }));

  // Set x, y and colors
  var x = d3.scale.ordinal()
    .domain(dataset[0].map(function(d) { return d.x; }))
    .rangeRoundBands([10, width-10], 0.02);

  var y = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
    .range([height, 0]);

  var colors = ["b33000", "#d11c4d", 
              "#f22247", "#d93374",
              "b34440", "#d55c4d", 
              "#f26647", "#d97774",
              "b38840", "#d2994d", 
              "#f00447", "#d90274",
              "bf3040", "#d25e4d"];

             
  

  
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-width, 0, 0)
    .tickFormat( function(d) { return d } );

  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(5)
    .orient("bottom")
    .tickFormat(d3.time.format("%b"));

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  
  var groups = svg.selectAll("g.cost")
    .data(dataset)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function(d, i) { return colors[i]; });

  var rect = groups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d.x); })
    .attr("y", function(d) { return y(d.y0 + d.y); })
    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
    .attr("width", x.rangeBand())
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on("mousemove", function(d) {
      var xPosition = d3.mouse(this)[0] - 15;
      var yPosition = d3.mouse(this)[1] - 25;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.select("text").text(d.y);
    });


  
  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
   
  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {return colors.slice().reverse()[i];});
   
  legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, i) { 
      switch (i) {
        case 13: return "Anti-social behaviour";
        case 12: return "Burglary";
        case 11: return "Vehicle crime";
        case 10: return "Violence/sexual offences";
        case 9: return "Other theft";
        case 8: return "Criminal damage/arson";
        case 7: return "Public order";
        case 6: return "Drugs";
        case 5: return "Robbery";
        case 4: return "Shoplifting";
        case 3: return "Possession of weapons";
        case 2: return "Theft from the person";
        case 1: return "Other crime";
        case 0: return "Bicycle theft";
      }
    });


 
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
      
  tooltip.append("rect")
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", "0.5 !important" );

  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

      

    }
  });
  
           } 
        };
        return directiveDefinitionObject;
     });