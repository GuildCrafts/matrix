const matrixState = {
  data: {},
  sortCriteria: 'topic',
  currentPriority: 1
}

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

Handlebars.registerHelper('checkPriority', function (conditional, options) {
  if (conditional === matrixState.currentPriority) {
    return options.fn(this)
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('difficulty', function(num) {
  const difficultyLookup = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Jedi'
  ]
  return difficultyLookup[num]
})

Handlebars.registerHelper('cssSafe', function(str) {
  return str.replace(/^[^a-z]+|[^\w:.-]+/gi, "");
});

Handlebars.registerHelper('sha', function(str) {
  return Sha1.hash(str);
});

function loadCards() {
  matrixState.topic_row_template = Handlebars.compile($('#topic_row_template').html());
  matrixState.priority_row_template = Handlebars.compile($('#priority_row_template').html());
  matrixState.nav_template = Handlebars.compile($('#nav_template').html());
  matrixState.priority_nav_template = Handlebars.compile($('#priority_nav_template').html());

  $.ajax({
  url: "data/skills.json",
  dataType: "json",
  success: function (data) {
        Object.assign(matrixState.data, data);

        renderPage();

        update_tracking();
        update_skill();

        $(".checkbox_tracking").change(function(event){
          var group = event.target.attributes["data-group"].value;
            toggle_tracking(this.checked, group);
        });

        $(".checkbox_skill").change(function(event){
          var skill = event.target.id;
          toggle_skill(this.checked, skill);
        });


        // $('.btn_goal').click(function(event){
        //     console.log(event);
        //     var frameSrc = event.target.attributes["href"].value;
        //     console.log(frameSrc);
        //     $('#iframe-goal').attr("src",frameSrc);
        //     $('#modal-goal').modal({show:true});
        //     return false;
        //   });
    }
  });

}

function renderPage() {
  const priorityObjects = [
    {section: 'Priority 1'},
    {section: 'Priority 2'},
    {section: 'Priority 3'},
    {section: 'Priority 4'},
    {section: 'Priority 5'},
    {section: 'Priority 6'}
  ]

  if (matrixState.sortCriteria === 'topic') {
    clearPage()
    $.each(matrixState.data, function(index, element) {
      $('#main-nav').append(matrixState.nav_template(element));
      $('#matrix').append(matrixState.topic_row_template(element));
    });
  } else {
    //Append priority view template htmls
    clearPage()
    $.each(priorityObjects, function(index, element) {
      $('#main-nav').append(matrixState.priority_nav_template(element));
    });

    $('.priority-nav-blop').click(function (event) {
      matrixState.currentPriority = +event.target.innerHTML.slice(-1)
      renderPriorityContent()
    })

    renderPriorityContent()
  }

  $('#main-nav a:first').tab('show');
}

function renderPriorityContent() {
  $('#matrix').empty()

  const thePriorityRow = document.createElement('div')
  thePriorityRow.id = 'thePriorityRow'
  thePriorityRow.classList.add('row','d-flex','flex-wrap')

  $('#matrix').append(thePriorityRow)

  $.each(matrixState.data, function(index, element) {
    $('#thePriorityRow').append(matrixState.priority_row_template(element));
  });

  //-------vvv duplicate code
  // renderPage();

  update_tracking();
  update_skill();

  $(".checkbox_tracking").change(function(event){
    var group = event.target.attributes["data-group"].value;
      toggle_tracking(this.checked, group);
  });

  $(".checkbox_skill").change(function(event){
    var skill = event.target.id;
    toggle_skill(this.checked, skill);
  });
  //--^^
}

$(document).ready(function(){
  $('#sort-buttons').click(function (event) {
    setSortCritera(event);

    //-------vvv duplicate code
    renderPage();

    update_tracking();
    update_skill();

    $(".checkbox_tracking").change(function(event){
      var group = event.target.attributes["data-group"].value;
        toggle_tracking(this.checked, group);
    });

    $(".checkbox_skill").change(function(event){
      var skill = event.target.id;
      toggle_skill(this.checked, skill);
    });
    //--^^
  });
})

function setSortCritera (event) {
  matrixState.sortCriteria = event.target.childNodes[1].id === 'option1' ?
    'topic' :
    'priority'
}

function clearPage() {
  $('#main-nav').empty()
  $('#matrix').empty()
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

function update_skill(){
  $(".checkbox_skill").each(function (index, value) {
    var skill = value.id;
    var state = localStorage.getItem(skill);
    if (state != null){
      state = (state == "true");
      toggle_skill(state,skill);
    }
  });
};



function toggle_skill(checked, skill){
    if (checked) {
      $("#" + skill).prop('checked', true);
      localStorage.setItem(skill,true);
    } else {
      $("#" + skill).prop('checked',false);
      localStorage.setItem(skill,false);
    }
}
