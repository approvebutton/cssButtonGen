$(function() {
  $( "#slider__radius, #slider__size" ).slider({ 
    orientation: "horizontal",
    max: 100,
    value: 20,
    range: "min" });
});
$( "#slider__radius" ).slider();
$( "#slider__size" ).slider();
