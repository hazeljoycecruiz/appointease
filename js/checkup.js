const url = "http://aebackend.test"

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

