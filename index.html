<html>
<head>
	<title>Facebook Like Standings</title>

	<!-- JQuery -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

	<!-- System CSS -->
    <link rel="stylesheet" href="style.css" >

    <script>
    
    	var pageAccessToken = {access_token : ''};

		$(document).ready(function() {
        	$.ajaxSetup({ cache: true });
          	$.getScript('//connect.facebook.net/en_UK/all.js', function(){
            
	            FB.init({
	              appId      : '922252757809604',
	              xfbml      : true,
	              version    : 'v2.2',
	              status	 : true
	            });     

            	var albumId = '787737351314841';

            	FB.getLoginStatus(function(response){
	        		// console.log(response.authResponse.accessToken);
	        		pageAccessToken = {access_token : response.authResponse.access_token}
	            });            

	            // FB.api('/'+albumId+'/photos?fields=data', pageAccessToken, function(response) { //faster
	            FB.api('/'+albumId+'/photos', pageAccessToken, function(response) {

	            	// console.log(response);

	            	//set title
	            	$('#header').append(response.data[0].from.name);

	            	var totalCandidates = response.data;
	            	
	            	for(var i=0;i<totalCandidates.length;i++){
	            		//console.log(response.data[i].id);            		
	            		showCandidates(response.data[i].id, pageAccessToken);
	            		// showLikeCounts(response.data[i].id, pageAccessToken);
	            	}
	            });
	            
	            
               			                      
                      
          	});

        var showLikeCounts = function (candidateId, pageAccessToken){        	   	
		        FB.api('/'+candidateId+'?fields=id,likes.limit(1).summary(true)', pageAccessToken, _callback);	        
        }

      	var showCandidates = function (candidateId, pageAccessToken){         		
			FB.api('/'+candidateId, pageAccessToken, _callback);      		      		   	
      	}

      	var _callback = function(response){
      		
      		if (response.source) {//show candidates				
				// console.log(response);
				var link = response.link;
				var profile = '<div id='+response.id+' class="candidates">';
					profile += '<a href='+link+' target="_blank"><img src='+response.source+' /></a>';
					profile += '</div>';
	      		$('#wrapper').append(profile);

	      		showLikeCounts(response.id, pageAccessToken);

      		}else{//show likes
      			//console.log(response.likes);      			
      			// console.log('like_count: '+response.likes.summary.total_count);      			
      			var totalCount = response.likes.summary.total_count;      			
      			$('#'+response.id).append('<p>Likes: <b>'+totalCount+'</b></p>');
      		};
                  
      	};



      });

		
    </script>
</head>
<body>
<script>
  window.fbAsyncInit = function() {
    

	/*FB.getLoginStatus(function(response) {
	  if (response.status === 'connected') {
	    // the user is logged in and has authenticated your
	    // app, and response.authResponse supplies
	    // the user's ID, a valid access token, a signed
	    // request, and the time the access token 
	    // and signed request each expire
	    var uid = response.authResponse.userID;
	    var accessToken = response.authResponse.accessToken;
	    console.log(accessToken);
	  } else if (response.status === 'not_authorized') {
	    // the user is logged in to Facebook, 
	    // but has not authenticated your app
	    console.log("not auth");
	  } else {
	  	console.log("logged out");
	    // the user isn't logged in to Facebook.
	  }
	});*/
	



  };
</script>



<!--div>
  class="fb-like"
  data-share="true"
  data-width="450"
  data-show-faces="true">
</div-->
<h2 id="header"></h2>
<div id="wrapper">

</div>
</body>
</html>