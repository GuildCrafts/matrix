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
        return "Core";
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
        $('#main-nav a:first').tab('show');
        update_tracking();
    }
  });

}

function hideEmptyCards() {
  $(".i-3.l-0").css({ opacity: 0.0 });
  $(".i-2.l-0").css({ opacity: 0.0 });
  $(".group-Template").hide();
  $(".Template").hide();
}


function update_tracking(){

  $(".checkbox_tracking").each(function (index, value) {
    group = value.attributes["data-group"].value
    console.log("group" + group);
    state = localStorage.getItem(group);
    toggle_tracking(state,group);
  });
};

function toggle_tracking(checked, group){
    if (checked) {
      $("#card" + group).fadeTo("slow",0.25);
      localStorage.setItem(group,true);
    } else {
      $("#card" + group).fadeTo("slow",1);
      localStorage.setItem(group,false);
    }
}

$( document ).ready(function() {
  $(document).on('change', '.checkbox_tracking', function(event) {
      toggle_tracking(this.checked, event.target.attributes["data-group"].value);
  });
});
