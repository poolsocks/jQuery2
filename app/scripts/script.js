$(document).ready(function(){
  $('#newTaskForm').hide();

  var listo = [];
  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  };
  var addTask = function(task) {
    // If text has been entered.
    if(task) {
      // Create new task object (task)
      task = new Task(task);
      // Push new object to array (listo)
      listo.push(task);

      // Clear input input form with .val('')
      $('#newItemInput').val('');
        // Add user input to page
        $('#newList').append(
          '<a href="#finish" class="" id="item">' +
          '<li class="list-group-item">' +
          '<h3>' + task.task + '</h3>' +
          '<span class="arrow pull-right">' +
          '<i class="glyphicon glyphicon-arrow-right">' +
          '</span>' +
          '</li>' +
          '</a>'
        );
    }
    // Close Form
    $('#newTaskForm').slideToggle('fast','linear');
  };




  /*============================================================================
                              Button Clicks
  ============================================================================*/
  // Opens Form
  $('#add-todo').on('click', function(){
    $('#newTaskForm').fadeToggle('fast','linear');
  });

  // Closes Form
  $('#cancel').on('click', function (e){
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast','linear');
  });

  // Invokes addTask Function (Add)
  $('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });



  // Use $(document) because we are effecting the html document (Append)
  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    // var task = this;
    // edited advanceTask(task)
    advanceTask(this);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });

  $(document).on('click', '#inProgress',  function(e){
    e.preventDefault();
    var task = this;
    task.id = 'archived';
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });

  $(document).on('click', '#archived', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });

  var advanceTask = function(task) {
    var modified = task.innerText.trim();
    for(var i = 0; i < listo.length; i++){
      if(listo[i].task === modified) {
        if(list[i].id === 'new') {
          listo[i].id === 'inProgress';
        } else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        } else {
          listo.splice(i,1);
        }
        break;
      }
    }
    task.remove();
  };
});
