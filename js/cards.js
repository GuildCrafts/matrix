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

  var row_template = Handlebars.compile($('#row_template').html());
  var nav_template = Handlebars.compile($('#nav_template').html());

  $.ajax({
  url: "data/skills.json",
  dataType: "json",
  success: function (data) {
        $.each(data, function(index, element) {
              $('#main-nav').append(nav_template(element));
              $('#matrix').append(row_template(element));
        });
        hideEmptyCards();
    }
  });

}

function hideEmptyCards() {
  $(".i-3.l-0").css({ opacity: 0.0 });
  $(".i-2.l-0").css({ opacity: 0.0 });
  $(".group-Template").hide();
  $(".Template").hide();
}
