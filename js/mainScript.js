	/*Function for searching the items*/	
		$(function (){
			var $tab = $('#tBody');
		
			$('#Button').on('click',function(){

				$tab.empty();
				$.ajax({
					type: 'GET',
					url: 'http://www.omdbapi.com/?s='+$('#searchinput').val().trim(),

					success: function(movies){
						$('#pagination').children().remove();
						var movie=movies.Search;
						var count=0;

						/*Error Handling*/

						if(movies.Error=="Something went wrong.")
						{
							$('#pagination').remove();
							alert('Please Enter Something!!');
						}
						else if(movies.Response=='False')
						{
							$('#pagination').remove();
							alert('Invalid Input!!');
						}

					    /*Iteration for data*/

						else
						{
							$.each(movie, function(i, film){
					// for (var i = 0; i<movie.length; i++) {
						 if(film.Poster==="N/A")
						{
							$tab.append('<tr  class="post"> <td> <img class = "img-responsive posterImg" src ="./../images/imgNA.jpg" >'+'</td>'+'<td>'+film.Title+'</td> '+' </td>'+'<td>'+film.Year+'</td>'+'<td>'+film.Type+'</td> </tr>');
						}
						else
						{
						$tab.append('<tr class="post"> <td> <img class = "img-responsive posterImg" src ='+film.Poster +'</td>'+'<td>  '+film.Title+'</td> '+' </td>'+'<td>'+film.Year+'</td>'+'<td>'+film.Type+'</td> </tr>');
					}
					count++;
					});
						}
						var itemsPerPage=3;
                     var paginationLength=Math.ceil(count/itemsPerPage);
                     $('.post').filter(":gt("+(itemsPerPage-1)+")").hide();
                     for(var i=0;i<paginationLength;i++){
                       $("#pagination").append("<li>"+ (i+1)  +"</li>");
                      }
               
                       $("#pagination li").on('click',function(){
                         $('.post').hide();
                         var linkNumber=$(this).text();
                         var contentToShow=$('.post').filter(':lt('+linkNumber*itemsPerPage+')');
                         var contentToHide=$('.post').filter(':lt('+(linkNumber-1)*itemsPerPage+')')
                        $.merge(contentToHide,$('.post').filter(":gt("+(((linkNumber)*itemsPerPage)-1)+")"));

                         contentToShow.show();
                         contentToHide.hide();
                         
                       });
				// });
			},
		});
			});
		});
	