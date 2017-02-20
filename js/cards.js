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

        $('#main-nav a:first').tab('show');
        update_tracking();

        $(".checkbox_tracking").change(function(event){
          var group = event.target.attributes["data-group"].value;
            toggle_tracking(this.checked, group);
        });
    }
  });

}

function update_tracking(){
  $(".checkbox_tracking").each(function (index, value) {
    var group = value.attributes["data-group"].value
    var state = localStorage.getItem(group);
    if (state != null){
      state = (state == "true");
      toggle_tracking(state,group);
    }
  });
};

function toggle_tracking(checked, group){
    if (group.startsWith("Template")){
      return;
    }

    if (checked) {
      $("#card" + group).fadeTo("slow",0.25);
      $("#card" + group).addClass("card-grey");
      localStorage.setItem(group,true);
      $("#checkbox" + group).prop('checked', true);
    } else {
      $("#card" + group).fadeTo("slow",1);
      $("#card" + group).removeClass("card-grey");
      localStorage.setItem(group,false);
    }
}
