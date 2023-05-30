$(document).ready(function() {
  $('.edit-employee-btn').click(function() {
    var employeeId = $(this).data('employee-id');
    $.ajax({
      url: '/employees/index/'+ employeeId+'/edit' ,
      type: 'GET',
      success: function(response) {
        $('#tableid').find('tr[data-employee-id="' + employeeId + '"]').html(response);
        $('#edit-form').submit(function(event) {
          event.preventDefault();
          $.ajax({
            url: '/employees/index/'+ employeeId+'/edit' ,
            type: 'POST',
            data: $(this).serialize(),
            success: function(response) {
              if (response.success) {
                // Update the table row with the new employee information
                $('#tableid').find('tr[data-employee-id="' + employeeId + '"]').html(response.html);
              } else {
                // Display an error message if the form is invalid
                alert('Invalid form data');
              }
            }
          });
        });
      }
    });
  });
});
