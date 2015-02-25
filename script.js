var pageAccessToken = {access_token : ''};
$(document).ready(function() {      
      $.ajaxSetup({ cache: true });
        $.getScript('//connect.facebook.net/en_UK/all.js', function(){
        
          FB.init({
            appId      : '922252757809604',
            xfbml      : true,
            version    : 'v2.2',
            status     : true
          });     
          var albumId = '787737351314841';
          FB.getLoginStatus(function(response){                
            pageAccessToken = {access_token : response.authResponse.access_token}
          });            
          // FB.api('/'+albumId+'/photos?fields=data', pageAccessToken, function(response) { //faster
          FB.api('/'+albumId+'/photos', pageAccessToken, function(response) {                      
            //set title
            $('#header').append(response.data[0].from.name + ' Standings');                
            
            for(var i=0;i<response.data.length;i++){                  
              showStandings(response.data[i].id, pageAccessToken);                  
            }            
          });                                                                      
        });

    var showStandings = function (candidateId, pageAccessToken){             
      FB.api('/'+candidateId+'?fields=id,source,link,likes.limit(0).summary(true)', pageAccessToken, callBack);
    }
      
    var counter = 0;
    var profile = '';
    

    var callBack = function(response){    
                
        var totalCount = response.likes.summary.total_count;        
        var link = response.link;

        profile += '<div class="col-xs-6 col-md-4"><div id='+response.id+' class="candidates">';
        profile += '<a href='+link+' target="_blank"><img src='+response.source+' class="img-responsive" /></a>';
        profile += '<div><i class="fa fa-thumbs-o-up" style="color:blue;"></i>  <b>'+totalCount+'</b></div>';
        profile += '</div></div>';                      
        counter++;
        if(counter % 3 == 0){
          var row = '<div class="row">'+profile+'<\/div>';              
          $('.container-fluid').append(row); 
          
          //clear profile
          profile = '';                      
        }          
                               
    };
  });