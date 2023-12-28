import { aebackendURL } from "../utils/utils.js";

// Form Register
const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button
  const submitButton = document.querySelector("#form_register button");
  submitButton.disabled = true;

  try {
    // Get Values of Form (input, textarea, select) set it as form-data
    const formData = new FormData(form_register);

    // Fetch API User Register Endpoint
    const response = await fetch(aebackendURL + "/api/patient", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    // Get response if 200-299 status code
    if (response.ok) {
      const json = await response.json();
      console.log('Successful Response:', json);

      // Additional actions after successful response
      form_register.reset();
      // successNotification("Successfully registered account.", 5);
    }
    // Get response if 422 status code
    else if (response.status == 422) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        const htmlResponse = await response.text();
        console.error('HTML Error Response:', htmlResponse);
        // Handle HTML error response
      } else {
        const json = await response.json();
        console.error('JSON Error Response:', json);
        // Handle JSON error response
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Enable Button
    submitButton.disabled = false;
    submitButton.innerHTML = `Register`;
  }
};
