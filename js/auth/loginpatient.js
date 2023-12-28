import {
  aebackendURL,
  successNotification,
  errorNotification,
} from "../utils/utils.js";

// Form Login
const form_login = document.getElementById("patient_login_form");

form_login.onsubmit = async (e) => {
    e.preventDefault();

    // //Disable Button
    // document.querySelector("#patient_login_form button").disabled = true;
    // document.querySelector("#patient_login_form button").innerHTML = `<div class="spinner-border me-2" role="status">
    //             </div>
    //             <span>Loading...</span>`;

    // // Tanggalon ra nato ni pag finalize
    // console.log('ma click ang login button');

    // Pagkuha sa Value sa form (input ug select) set it as form-data
    const formData = new FormData(form_login);

    // Fetch API user login endpoint
    const response = await fetch(aebackendURL + "/api/userlogin", {
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
        // Tanggalon ning console log upon finalization
        console.log(json);

        localStorage.setItem("token", json.token);

        form_login.reset();

        successNotification("Successfully Logged in.", 5);

        window.location.pathname = "/organizer-dashboard.html";

}

    // Get response if 422 status code
    else if (response.status == 422) {
        const json = await response.json();

        errorNotification(json.message, 5);
    }

    // // Enable Button
    // document.querySelector("#form_login button").disabled = false;
    // document.querySelector("#form_login button").innerHTML = `Login`;
};
