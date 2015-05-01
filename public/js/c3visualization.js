(function() {
  $.getJSON( '/igMediaCounts')
    .done(function( data ) {
      var parent = document.getElementById("parent");
      var child = document.getElementById("prog");
      
      var yCounts = data.users.map(function(item){
        console.log("item " + item);
        return item.counts.media;
      });
      
      yCounts.unshift('Media Count');

      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            yCounts 
          ]
          //type: 'spline' //to make as a spline chart instead of pointy lines
        }
      });
      parent.remove(child);

    });
})();
