var sportActivities = ["Bicycle", "Soccer", "Climbing", "Skiing", "Weightlifting", "Netball", "Tennis","  Diving","Jogging", "Aerobics", "Swimming","Hockey","Badminton", "Volleyball", "Boxing", "Baseball ", "Archery","Equestrian", "Rugby", "Wrestling", "Water polo", "Table tennis","Taekwondo", "Sailing", "Snowboard"];

      function mBAddToP(spo){
      //   var button = $('<button>').text(spo);
      //   $('#buttons').append(button);
      // }
      $('#buttons').append("<button class='btn-primary topic-btn'> " + spo + "</button>");
         }

      //loop over the movies array and add buttons to a div
      for (var index in sportActivities){
        mBAddToP(sportActivities[index]);
      }

      $('#addSport').on('click', function(){
        event.preventDefault();

        var sport = $('input').val();

        sportActivities.push(sport);
        $('input').val("");

        mBAddToP(sport);
      });

      $(document).on('click', '#buttons button', function(){
        var button = $(this);
        var  sports= button.text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+sports+"&api_key=5vh2Q8LKUTjYONc8pRYbNZJclYx62273&limit=10;"
        //var req = "https://www.omdbapi.com/?t=" + movie +"&y=&plot=short&apikey=trilogy";

        $.ajax({url: queryURL})
        .then(function(response){  
          console.log(response);   
          var result= response.data;
          console.log(result);    
           for (var i = 0; i < result.length; i++) {

                  var sportDiv = $("<div>");
                  sportDiv.addClass('imgdiv');
                 // sportDiv.addClass('picBoarder');
                  
                  var par =$('<p>');
                  par.addClass('paraClass');
                  par.text("Rating:"+ result[i].rating);
                  console.log( result[i].rating);

                  var pDiv = $('<div>');
                  pDiv.addClass('paraDiv');
                  pDiv.append(par);

                  var pT= $('<p>');
                  pT.addClass('paraTclass');
                  pT.text('Title:' + result[i].title);
                  console.log(result[i].title);

                  var pTdiv = $('<div>');
                  pTdiv.addClass('paraTdiv');
                  pTdiv.append(pT);

                  var sportImage = $('<img>');
                  sportImage.addClass('picImg');
                  sportImage.attr('src', result[i].images.fixed_height_still.url).attr('width', "250").attr('height', "200");
                  sportImage.attr('data-still', result[i].images.fixed_height_still.url);
                  sportImage.attr('data-animate', result[i].images.fixed_height.url);
                  sportImage.attr('data-state', 'still');

                
                  sportDiv.append(pDiv);                  
                  sportDiv.append(pTdiv);
                  sportDiv.append(sportImage);
                  $("#displayer").append(sportDiv);
                 
               }

                $('.picImg').on('click', function() {
                  var state = $(this).attr('data-state'); 
                    console.log(this);
                  if (state === 'still') {
                    
                    $(this).attr('src', $(this).data('animate'));
                    
                    $(this).attr('data-state', 'animate');

                    } else {
                            
                    $(this).attr('src', $(this).data('still'));
                    
                    $(this).attr('data-state', 'still');
                    }      
                  });
      
        });
      });