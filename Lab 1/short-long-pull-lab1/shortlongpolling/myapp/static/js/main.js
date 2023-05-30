$(document).ready(function() {
    // Fetch the list of todos
    $.ajax({
      url: "/todos/",
      type: "GET",
      success: function(data) {
        var todos = data.todos;
        for (var i = 0; i < todos.length; i++) {
          var todo = todos[i];
          var li = $("<li>").text(todo.title);
          if (todo.completed) {
            li.addClass("completed");
          }
          $("#todo-list").append(li);
        }
      }
    });
  
    // Add a new todo
    $("#add-todo-form").submit(function(event) {
      event.preventDefault();
      var title = $("input[name='title']").val();
      $.ajax({
        url: "/create-todo/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"title": title}),
        success: function(data) {
          var todo = data;
          var li = $("<li>").text(todo.title);
          $("#todo-list").append(li);
        }
      });
    });
  });
  