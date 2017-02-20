Handlebars.registerHelper('levelClass', function(level) {
  switch(level) {
    case 0:
        return "card-inverse card-danger";
        break;
    case 1:
        return "card-inverse card-danger";
        break;
    case 2:
        return "card-inverse card-primary";
        break;
    case 3:
        return "card-inverse card-info";
        break;
    case 4:
        return "card-inverse card-success";
        break;
    case 5:
        return "";
        break;
    case 6:
        return "";
        break;
    default:
        return "";
      }
});

Handlebars.registerHelper('complexity', function(index) {
  switch(index) {
    case 0:
        return "Beginner";
        break;
    case 1:
        return "Intermediate";
        break;
    case 2:
        return "Advanced";
        break;
    case 3:
        return "Jedi";
        break;
    default:
        return "";
      }
});



Handlebars.registerHelper('cssSafe', function(str) {
  return str.replace(/^[^a-z]+|[^\w:.-]+/gi, "");
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
        $('#main-nav a:first').tab('show')
    }
  });

}

function hideEmptyCards() {
  $(".i-3.l-0").css({ opacity: 0.0 });
  $(".i-2.l-0").css({ opacity: 0.0 });
  $(".group-Template").hide();
  $(".Template").hide();
}
