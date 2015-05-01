(function() {
  $.getJSON( '/igMediaCounts' )
    .done(function( data ) {
      var parent = document.getElementById("parent");
      var child = document.getElementById("prog");

      var followedBy = data.users.map(function(item){
        
        return item.counts.followed_by; //number of posts/photos
      });//close .map()
      
      var following = data.users.map(function(item) {
		    return item.counts.follows; //number this individual profile is following EX: ledpresents following 53 people
	   });//close .map()
      
      
      followedBy.unshift('Followed By');
      following.unshift('Following');

      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            followedBy,
            following 
          ],
          type: 'area-spline'
          
        }//close data
        
      });//close .generate
      parent.remove(child);
    });//close .done
    

})();
