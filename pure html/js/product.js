$( ".prod" )
  .mouseenter(function() {
    //n += 1;
    //$( this ).find( "span" ).text( "mouse enter x " + n );
	$( this ).find("div").removeClass("transparent");
  })
  .mouseleave(function() {
    //$( this ).find( "span" ).text( "mouse leave" );
	$( this ).find("div").addClass("transparent");
  });