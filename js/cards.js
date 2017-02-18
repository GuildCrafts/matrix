function loadCards() {

  var template = Handlebars.compile($('#row_template').html());

  $.ajax({
  url: "data/skills.json",
  dataType: "json",
  success: function (data) {
        $.each(data, function(index, element) {
              $('#matrix').append(template(element));
        });
    }
  });
}
