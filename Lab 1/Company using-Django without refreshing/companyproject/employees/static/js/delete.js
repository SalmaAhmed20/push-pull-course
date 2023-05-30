$(document).ready(function() {
    // Attach click event listener to delete button
    $('.delete-button').click(function() {
      // Get employee ID from data attribute
      var employeeId = $(this).data('employee-id');
  
      // Send AJAX request to delete employee
      $.ajax({
        url: '/employees/index/'+ employeeId +"/delete",
        method: 'POST',
        success: function(response) {
          // Remove row from table
          $('#tableid').find('tr[data-employee-id="' + employeeId + '"]').remove();
        }
      });
    });
  });
  