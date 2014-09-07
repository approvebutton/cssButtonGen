jQuery(function ($) {

    var radius = 10,
        size   = 2,
        width  = 25,
        height = 15,
        errors,
        $this = $(this);

    var app = {

        initialize: function() {
            app.createSliders();
            app.updateHTML();
            app.sendEmail();
        },

        createSliders: function() {

            // Slider Radius
            $('#slider__radius').slider({
                
                orientation: "horizontal",
                max:     30,
                value:   10,
                range:   "min",
                animate: "slow",
                slide: function(e, ui) {
                    radius = ui.value;
                    app.updateButton();
                    app.updateCSS();
                    app.createHTML();
                  }
            }),

            // Slider Size
            $('#slider__size').slider({
                orientaion: "horizontal",
                max:     15,
                value:   2,
                range:   "min",
                animate: "slow",
                slide: function(e,ui) {
                    size = ui.value;
                    app.updateButton();
                    app.updateCSS();
                    app.createHTML();
                }
            }),

            // Slider Button Width
            $('#slider__width').slider({
                orientaion: "horizontal",
                max:     45,
                value:   25,
                range:   "min",
                animate: "slow",
                slide: function(e,ui) {
                    width = ui.value;
                    app.updateButton();
                    app.updateCSS();
                    app.createHTML();
                }
            }),

            // Slider Button Height
            $('#slider__height').slider({
                orientaion: "horizontal",
                max:     25,
                value:   15,
                range:   "min",
                animate: "slow",
                slide: function(e,ui) {
                    height = ui.value;
                    app.updateButton();
                    app.updateCSS();
                    app.createHTML();
                }
            });
        },

        // Update result Button
        updateButton: function() {
            $("#result").css({
                borderRadius: radius,
                borderWidth:  size,
                paddingTop: height,
                paddingBottom: height,
                paddingLeft: width,
                paddingRight: width
            });
        },

        // Update code in CSS field
        updateCSS: function() {
            $(".result__form-css").val(
                '.btn {\n' +
                '  -webkit-border-radius: ' + radius + 'px;\n' +
                '     -moz-border-radius: ' + radius + 'px;\n' +
                '          border-radius: ' + radius + 'px;\n' +
                '  border-width: ' + size + 'px;\n' +
                '  padding: ' + height + 'px ' + width + 'px;\n' +
                '}'
            );
        },

        // Create code in HTML field
        createHTML: function() {
            $(".result__form-html").text( '<button class="btn"">'+ $("#button__text").val() + "</button>" )
        },

        // Update code in HTML field
        updateHTML: function() {
            $("#button__text").on("keyup", function() {
              $("#result").text( $(this).val() );
              $(".result__form-html").text( '<button class="btn">'+ $(this).val() + "</button>" );
            });
        },


        // Function for send email

        sendEmail: function() {
          $('#result__form').submit(function() {
            errors = false;
            $('.errors').empty(); 

            // Email field validation

            if ( $("#email").val() === "" ) {
                errors = true;
                $("#email").next().text("Please enter valid email");
              }

            // Create mail request 
            if ( !errors ) {

              var data = $("#result__form").serialize();

              $.ajax({
                  url: 'mail.php',
                  type: 'POST',
                  data: data,
                  beforeSend: function(){
                    $(".spinner").show();
                  },
                  success: function() {
                    $("#email").val('');
                    $(".spinner").hide();
                    $("#submit").next().text("Mail send");
                  },
                  error: function() {
                    alert('Error!');
                  }
              });
            }
            return false;
          });
        }
  };
    app.initialize();
});
