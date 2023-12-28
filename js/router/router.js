function setRouter() {
    switch (window.location.pathname) {
      // If you are logged in you cant access outside pages; redirect to dashboard
      case "/":
      case "/home.html":
      case "/patient.html":
      case "/loginpatient.html":
      case "/patient.html":
      case "/patient.html":
        if (localStorage.getItem("token")) {
          window.location.pathname = "/appointment.html";
        }
        break;
  
      // If you are not logged in you cant access dashboard pages; redirect to /
      case "/appointment.html":
      case "/appreport.html":
      case "/staffdashboard.html":
      case "/docsched.html":
      case "/index.html":
      case "/checkup.html":
      case "/referral.html":
        if (!localStorage.getItem("token")) {
          window.location.pathname = "/";
        }
        break;
  
      // For Admin Users only; redirect to /dashboard
      case "/users.html":
        if (localStorage.getItem("role") != "Admin") {
          window.location.pathname = "/dashboard.html";
        }
        break;
  
      default:
        break;
    }
  }
  
  export { setRouter };
  