var pageAccessToken = {access_token : ''};
localStorage.order = "asc";
var albumId = '787737351314841';

$(document).ready(function() {      

    $.ajaxSetup({ cache: true });
    

    $.getScript('//connect.facebook.net/en_UK/all.js', function(){
      
      FB.init({
        appId      : '922252757809604',
        xfbml      : true,
        version    : 'v2.2',
        status     : true
      });  
      
      FB.getLoginStatus(function(response){                
        pageAccessToken = {access_token : response.authResponse.access_token}
      }); 

      // FB.api('/'+albumId+'/photos?fields=data', pageAccessToken, function(response) { //faster
      FB.api('/'+albumId+'/photos', pageAccessToken, function(response) {                            
        //set title
        $('#header').append(response.data[0].from.name + ' Standings');                
                                
      });                                                                   
    });

    fbApi();

    $(document).on('click', '.asc', function(){      
      $(this).siblings('div.row').remove();
      $('.container-fluid').append("<h1 class='test' style='text-align:center'>Loading...</h1>"); 
      localStorage.order = "asc";      
      fbApi();
    });

    $(document).on('click', '.desc', function(){      
      $(this).siblings('div.row').remove();      
      $('.container-fluid').append("<h1 class='test' style='text-align:center'>Loading...</h1>"); 
      localStorage.order = "desc";      
      fbApi();
    });
  });      

  var candidate = [];
  var profile = ''; 
  var len = 0;

  var showStandings = function (data, pageAccessToken){ 
    
    for(var i=0;i<data.length;i++){ //loop through the results

      len = i;
      var counter = 0;

      FB.api('/'+data[i].id+'?fields=id,source,link,likes.limit(0).summary(true)', pageAccessToken, function(response){  

        var ar = [];  
        var temp = {
                  "id" : response.id,
                  "source" : response.source,
                  "likes" : response.likes.summary.total_count,
                  "link" : response.link
                  };              

        candidate.push(temp);        
               
        if(counter === len){ 

          for(var i=0;i<candidate.length;i++){
            ar.push(candidate[i].likes);
          }      
          
          ar.sort(function(a, b){
            if(localStorage.order == "asc"){
              return a-b;
            }else{
              return b-a;
            }
            
          });
          
          for(var a=0;a<ar.length;a++){
            for(var c=0;c<candidate.length;c++){          
              if(ar[a] == candidate[c].likes){
                
                  profile += '<div class="col-xs-6 col-md-4"><div id='+candidate[c].id+' class="candidates">';
                  profile += '<a href='+candidate[c].link+' target="_blank"><img src='+candidate[c].source+' class="img-responsive" /></a>';
                  profile += '<div class="label label-primary" style="font-size: 18px; padding-top: 10px; margin-top: 10px"><i class="fa fa-thumbs-o-up" style="color:white;"></i>  <b>'+candidate[c].likes+'</b></div>';
                  profile += '</div></div>';   

                  if((a+1) % 3 == 0){                
                    var row = '<div class="row">'+profile+'<\/div>';
                    $('.test').remove();              
                    $('.container-fluid').append(row); 
                    
                    //clear profile
                    profile = '';                      
                  }
              }              
            }
            
          }        
          candidate = [];
          counter = 0;
        } 
        counter++;                                
      });
    }    
    
  }    

var fbApi = function(){                       
        $.getScript('//connect.facebook.net/en_UK/all.js', function(){                          
            
          // FB.api('/'+albumId+'/photos?fields=data', pageAccessToken, function(response) { //faster
          FB.api('/'+albumId+'/photos', pageAccessToken, function(response) {              
            showStandings(response.data, pageAccessToken);                              
          });  

        });
      };