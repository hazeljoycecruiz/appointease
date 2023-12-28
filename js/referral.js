import {
  aebackendURL,
  successNotification,
  errorNotification,
} from "../utils/utils.js";

document.addEventListener("DOMContentLoaded", function () {
    const referralForm = document.getElementById("referralForm");
  
    referralForm.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      // Disable the submit button to prevent multiple submissions
      document.querySelector("#referralForm button").disabled = true;
  
      // Get form data
      const formData = new FormData(referralForm);
  
      try {
        // Fetch API Referral Endpoint
        const response = await fetch(aebackendURL + "/api/referral", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });
  
        if (response.ok) {
          // Referral submission successful
          referralForm.reset();
          successNotification("Referral submitted successfully.", 5);
        } else {
          // Referral submission failed
          const errorData = await response.json();
          console.error("Error:", errorData);
          errorNotification("Failed to submit referral.", 5);
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle unexpected errors, if needed
        errorNotification("An unexpected error occurred.", 5);
      } finally {
        // Enable the submit button
        document.querySelector("#referralForm button").disabled = false;
      }
    });
  });
  