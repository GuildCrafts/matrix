Handlebars.registerHelper('levelClass', function(level) {
  return "";
  switch(level) {
    case 0:
        return "card-inverse card-primary";
        break;
    case 1:
        return "card-inverse card-primary";
        break;
    case 2:
        return "card-inverse card-success";
        break;
    case 3:
        return "card-inverse card-info";
        break;
    case 4:
        return "card-inverse card-warning";
        break;
    case 5:
        return "card-inverse card-danger";
        break;
    case 6:
        return "card-inverse card-danger";
        break;
    default:
        return "";
      }
});


function loadCards() {

  var template = Handlebars.compile($('#row_template').html());

  $.ajax({
  url: "data/skills.json",
  dataType: "json",
  success: function (data) {
        $.each(data, function(index, element) {
              $('#matrix').append(template(element));
        });
        hideEmptyCards();
    }
  });

}

function hideEmptyCards() {
  $(".i-3.l-0").css({ opacity: 0.0 });
  $(".group-Template").hide();
}
