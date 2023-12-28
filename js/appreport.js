
// const btn_logout = document.getElementById("btn_logout");

// btn_logout.onclick = async () => {
//     //alert("ma click siya");

//         // Access Logout API endpoint
//         const response = await fetch(backendURL + "/api/logoutapp", {
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


import {
    aebackendURL,
    successNotification,
    errorNotification,
  } from "../utils/utils.js";

// Get all data
getDatas();

async function getDatas() {
    // Get API endpoint
    const response = await fetch(backendURL + "/api/appointments/1", {
        headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
        },
    });

    if (response.ok) {
        const json = await response.json();

        let container = "";

        json.forEach((element) =>  {
            const date = new Date(element.created_at).toLocaleString();

            container += `
                    <tbody>
                    <tr>
                    <td>${element.lastname},${element.firstname}</td>
                    <td>${element.appointment_date}</td>
                    <td>${element.appoinment_time}</td>
                    <td>${element.symptoms}</td>
                    <td>${element.comments}</td>
                    <td>${element.status}</td>
                    <td><button class="btn btn-success" onclick="confirmAppointment(1)">Confirm</button></td>
                    </tr>
                    </tbody>`;
        });
        // Use innerHTML to replace the content of the container element
        document.getElementById("getDatas").innerHTML = container;
    } else {
        // Handle HTTP errors
        errorNotification("HTTP-Error: " + response.status);
    }
}

