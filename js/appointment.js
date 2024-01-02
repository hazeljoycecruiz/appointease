

// const btn_logout = document.getElementById("btn_logout");

// btn_logout.onclick = async () => {
//     //alert("ma click siya");

//         // Access Logout API endpoint
//         const response = await fetch(backendURL + "/api/logout", {
//             //gi comment kay on default daw ang GET // refer sa video nalang if maglibog or naay utruhon basa sa notes
//             //method: "POST",
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           }
//         }); 
    
//          // Get response if 200-299 status code
//          if (response.ok) {
            
//             //clear token sa storage
//             localStorage.clear();
//             //pwedi nadaw kwaon
//             //const json = await response.json();
//             //successNotification("Logout Successful.")
            
//             // Redirect Page
//             window.location.pathname = "/index.html";
//             alert("Logout Successful.");
       
//         }
    
//         // Get response if 400 or 500 status code
//         else {
//             const json = await response.json();
    
//             errorNotification(json.message, 10);
//         }

// };

import { aebackendURL, successNotification } from "/js/utils/utils.js";

const appointmentForm = document.getElementById("appointment_form");

appointmentForm.addEventListener("submit", async function (e) {
    e.preventDefault();


    const timeInput = appointmentForm.querySelector("#setTime");
    const enteredTime = timeInput.value.trim();
    
    // Client-side validation for appointment time
    if (!enteredTime) {
        alert("Appointment time is required.");
        return;
    }


    //Use a regular expression to check if the entered time matches the format "H:i A"
    const timeFormatRegex = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    if (!timeFormatRegex.test(enteredTime)) {
        alert("Invalid time format. Please use the format H:i A (e.g., 12:30 PM).");
        return;
    }

    // Continue with the rest of the code for formatting and sending the request
    const formData = new FormData(appointmentForm);

    try {
        const response = await fetch(aebackendURL + "/api/appointment", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
            body: formData,
        });

        if (response.ok) {
            const json = await response.json();
            console.log(json);
            // Handle success, if needed
            console.log('ma click');
            appointmentForm.reset();
            console.log('Successful Response:', json);

            successNotification("Request successfully sent.", 5);
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);

            // Display validation errors to the user
            const errorMessages = Object.values(errorData.errors).flat();
            alert(`Validation Errors: ${errorMessages.join(", ")}`);
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle unexpected errors, if needed
    }
});


