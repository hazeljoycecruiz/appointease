import {
  aebackendURL,
  successNotification,
  errorNotification,
} from "../utils/utils.js";

// Function to handle checkup form submission
const handleCheckupFormSubmit = async (e) => {
  e.preventDefault();

  // Get form elements
  const checkupForm = document.getElementById("checkupForm");
  const formData = new FormData(checkupForm);

  try {
    // Post data to the server
    const response = await fetch(aebackendURL + "/api/checkup", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (response.ok) {
      const json = await response.json();
      console.log(json);
      // Handle success, if needed
      checkupForm.reset();
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
      // Handle error, if needed
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle unexpected errors, if needed
  }
};

// Event listener for checkup form submission
const checkupForm = document.getElementById("checkupForm");
checkupForm.addEventListener("submit", handleCheckupFormSubmit);

// Function to fetch checkup data from the server
const fetchCheckupData = async () => {
  try {
    // Fetch data from the server
    const response = await fetch(url + "/api/checkup");
    if (response.ok) {
      const data = await response.json();
      // Populate the table with the fetched data
      populateCheckupTable(data);
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
      // Handle error, if needed
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle unexpected errors, if needed
  }
};

// Function to populate the checkup table with data
const populateCheckupTable = (data) => {
  const tableBody = document.querySelector("#checkupTable tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  data.forEach((checkup) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${checkup.checkupId}</td>
      <td>${checkup.appointmentId}</td>
      <td>${checkup.scheduleDate}</td>
      <td>${checkup.medicationPrescribed}</td>
      <td>${checkup.diagnose}</td>
      <td>
        <a href="referral.html"><button class="btn btn-primary">Refer</button></a>
      </td>
    `;
    tableBody.appendChild(row);
  });
};

// Fetch checkup data when the page loads
document.addEventListener("DOMContentLoaded", fetchCheckupData);
