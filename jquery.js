// datepicker function
$( function() {
    $( "#datepicker" ).datepicker();
   } ); 
  // Radio box function
  $( function() {
    $( "#input" ).checkboxradio();
  } );
// Mode of payment function
  $( function() {
    $( "#selectable" ).selectable();
  } );
// Slider function
  $(function() {
            $( "#s1" ).slider({
               value: 30,
               animate:"slow",
               orientation: "vertical"
            });
         });
  // gender menu
  $( function() {
    $( "gender" ).selectmenu();
  });
  // tabs function for watches
  $( function() {
    $( "#tabs" ).tabs();
  } );
  //  Province selector function
  $( function() {
    var availableTags = [
      "Alberta",
      "British Columbia",
      "Nova Scotia",
      "Onatrio",
      "Prince Edward",
      "Quebec"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );
// progress bar and animation funtion
 $( function() {
            $( "#progressbar_2" ).progressbar({ value: 30 });
            var progressbar = $( "#progressbar_2" );
            $( "#progressbar_2" ).progressbar( "option", "max", 1024 );
            function progress() {
               var val = progressbar.progressbar( "value" ) || 0;
               progressbar.progressbar( "value", val + 1 );
               if ( val < 999 ) {
                  setTimeout( progress, 120 );
               }
            }
            setTimeout( progress, 500 );
    });

// tool tip function
   $( function() {
    $( document ).tooltip();
  } );
// initial dialog box funtion
  $( function() {
    $( "#dialog" ).dialog();
  } );
// submit button function
      function myFunction1() {
      var txt = "Order Placed : On the way Home !"
      alert(txt);
      window.location.href = '../html/jquery.html';
     }