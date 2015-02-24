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
              showCandidates(response.data[i].id, pageAccessToken);                  
            }
          });
                                                                         
        });
    var showLikeCounts = function (candidateId, pageAccessToken){             
      FB.api('/'+candidateId+'?fields=id,likes.limit(1).summary(true)', pageAccessToken, _callback);          
    }
    var showCandidates = function (candidateId, pageAccessToken){             
      FB.api('/'+candidateId, pageAccessToken, _callback);                        
    }        
    var counter = 0;
    var profile = '';

    var _callback = function(response){      

      if (response.source) {//show candidates    
        var link = response.link;
        profile += '<div class="col-xs-6 col-md-4"><div id='+response.id+' class="candidates">';
        profile += '<a href='+link+' target="_blank"><img src='+response.source+' /><\/a>';
        profile += '<\/div><\/div>';
        counter++;

        if(counter % 3 == 0){
          var row = '<div class="row">'+profile+'<\/div>';              
          $('.container-fluid').append(row); 
                    
          //clear profile
          profile = '';              
        }
        
        showLikeCounts(response.id, pageAccessToken);
        
      }else{//show likes           
        var totalCount = response.likes.summary.total_count;            
        $('#'+response.id).append('<div><i class="fa fa-thumbs-o-up" style="color:blue;"></i>  <b>'+totalCount+'</b></div>');
      };
              
    };
  });