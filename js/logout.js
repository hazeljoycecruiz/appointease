// logout.js

// Function to handle logout
function logout() {
    // You can perform additional logout-related tasks here if needed
    // For now, let's redirect to the logout.php page
    window.location.href = 'logout.php';
  }
  
  // Add an event listener to the logout link
  document.addEventListener('DOMContentLoaded', function () {
    var logoutLink = document.querySelector('.top-right-bar a');
    if (logoutLink) {
      logoutLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default link behavior
        logout(); // Call the logout function
      });
    }
  });
  