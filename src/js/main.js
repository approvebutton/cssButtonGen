(function () {

    $('#slider__radius').slider({
      orientation: "horizontal",
      max: 30,
      value: 10,
      range: "min",
      animate: "slow",
      slide: function(e, ui) {
         $("#result").css({
        "border-radius" : ui.value});
          $(".result__form-html").text(
        '<button class="btn"">'+ $("#button__text").val() + "</button>" );
       $(".result__form-css").text(
        '.btn {\n' +
        '  border-radius: ' + ui.value + 'px;\n' +
        '  border-width: ' + $("#slider__size").slider("value") + 'px;\n' +
        '}' );
      }
    });

    $('#slider__size').slider({
      orientation: "horizontal",
      max: 15,
      value: 0,
      range: "min",
      animate: "slow"
    });

    $("#slider__size").on("slide", function(e,ui){
      $("#result").css({
        "border-width" : ui.value});
      $(".result__form-html").text(
        '<button class="btn"">'+ $("#button__text").val() + "</button>" );
      $(".result__form-css").text(
        '.btn {\n' +
        '  border-radius: ' + $("#slider__radius").slider("value") + 'px;\n' +
        '  border-width: ' + ui.value + 'px;\n' +
        '}' );

    });

    $("#button__text").on("keyup", function(){
      $("#result").text($(this).val());
      $(".result__form-html").text(
        '<button class="btn"">'+ $(this).val() + "</button>" );
    });

    $(function() {
      $('#result__form').submit(function() {
        var errors = false;
        $('.errors').empty();
        if ( $("#email").val() === "" ) {
            errors = true;
            $("#email").next().text("Не заполнено поле")
          };
        if ( !errors ) {
          var data = $("#result__form").serialize();
          $.ajax({
              url: 'mail.php',
              type: 'POST',
              data: data,
              success: function(res) {

              },
              error: function() {
                alert('Error!');
              }
          })
        }
        return false;
      })
    });

})();

