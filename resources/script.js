var pageAccessToken = {access_token : ''};
var albumId = '787737351314841';


localStorage.order = "asc";
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
        $('#header').append(response.data[0].from.name);                
                                
      });                                                                   
    });

    fbApi();

    $(document).on('click', '.asc', function(){      
      $(this).siblings('div.profile').remove();
      $('#myPieChart').remove();
      $('#myDoughnutChart').remove();
      $('.container-fluid').append("<h1 class='loading' style='text-align:center'>Loading...</h1>"); 
      localStorage.order = "asc";      
      fbApi();
    });

    $(document).on('click', '.desc', function(){      
      $(this).siblings('div.profile').remove();       
      $('#myPieChart').remove();     
      $('#myDoughnutChart').remove(); 
      $('.container-fluid').append("<h1 class='loading' style='text-align:center'>Loading...</h1>"); 
      localStorage.order = "desc";      
      fbApi();
    });
  });      

  var candidate = [];
  var chart_data = [];
  var profile = ''; 
  var len = 0;
  var colors = [
              'red',
              'orange', 
              'pink', 
              'green', 
              'blue', 
              'violet', 
              'brown', 
              'aliceblue',               
              'chocolate', 
              'crimson', 
              'cyan', 
              'dimgray', 
              'gold', 
              'dodgerblue', 
              'greenyellow',                           
              'indigo'
              ];

  var names = [
    { id : 787737454648164, name : "Cheryl Metoda"},
    { id : 787737584648151, name : "Joan Dupio"},
    { id : 787737491314827, name : "Dee Vee Ann Lamis"},
    { id : 787737747981468, name : "Maryphel Agnasin"},
    { id : 787737797981463, name : "Neliza Supilanas"},
    { id : 787737707981472, name : "Mariel Mahusay"},
    { id : 787737627981480, name : "Mackie Shaine Go"},
    { id : 787737534648156, name : "Ana Erica Avanceña"},
    { id : 787737394648170, name : "Yvette Talita"}
  ];

  var shuffle = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

  
    return array;
  }

  var showStandings = function (data, pageAccessToken){

    colors = shuffle(colors);   

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

        var temp2 = {
              value : response.likes.summary.total_count,
              color : colors[counter],
              label : mapNames(response.id)
        };              

        chart_data.push(temp2);
        candidate.push(temp);        
               
        if(counter === len){ 
        
          $('.canvas').append('<canvas id="myPieChart" width="400" height="400"></canvas>');
          $('.canvas').append('<canvas id="myDoughnutChart" width="400" height="400"></canvas>');
          // Get context with jQuery - using jQuery's .get() method.          
          ctx1 = $("#myPieChart").get(0).getContext("2d");          
          ctx2 = $("#myDoughnutChart").get(0).getContext("2d");          
          new Chart(ctx1).Pie(chart_data);
          new Chart(ctx2).Doughnut(chart_data);                                 

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
                  profile += '<h3><span class="label label-primary">Candidate Name: '+mapNames(candidate[c].id)+'</span></h3><a href='+candidate[c].link+' target="_blank"><img src='+candidate[c].source+' class="img-responsive" /></a>';
                  profile += '<div class="label label-primary" style="font-size: 18px; padding-top: 10px; margin-top: 10px"><i class="fa fa-thumbs-o-up" style="color:white;"></i>  <b>'+candidate[c].likes+'</b></div>';
                  profile += '</div></div>';   

                  if((a+1) % 3 == 0){                
                    var row = '<div class="row profile">'+profile+'<\/div>';
                    $('.loading').remove();              
                    $('.gallery').append(row); 
                    
                    //clear profile
                    profile = '';                      
                  }
              }              
            }
            
          }        
          candidate = [];
          chart_data = [];
          counter = 0;
        } 
        counter++;                                
      });
    }    
    
  }
    
var mapNames = function(id){
  var name = '';
  for(var i=0;i<names.length;i++){
    if(id == names[i].id){
      name = names[i].name;
    }
  }
  return name;
}



var fbApi = function(){                       
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){                          
      
    // FB.api('/'+albumId+'/photos?fields=data', pageAccessToken, function(response) { //faster
    FB.api('/'+albumId+'/photos', pageAccessToken, function(response) {              
      showStandings(response.data, pageAccessToken);                              
    });  

  });
};
