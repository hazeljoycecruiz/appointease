import {
  aebackendURL,
  successNotification,
  errorNotification,
} from "../utils/utils.js";

// Function to handle doctor's schedule form submission
const handleDoctorScheduleFormSubmit = async (e) => {
  e.preventDefault();

  // Get form elements
  const doctorScheduleForm = document.getElementById("doctorScheduleForm");
  const formData = new FormData(doctorScheduleForm);

  try {
    // Post data to the server
    const response = await fetch(url + "/api/sched", {
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
      doctorScheduleForm.reset();
      // Fetch and display updated schedule data
      fetchDoctorScheduleData();
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

// Event listener for doctor's schedule form submission
const doctorScheduleForm = document.getElementById("doctorScheduleForm");
doctorScheduleForm.addEventListener("submit", handleDoctorScheduleFormSubmit);

// Function to fetch doctor's schedule data from the server
const fetchDoctorScheduleData = async () => {
  try {
    // Fetch data from the server
    const response = await fetch(url + "/api/sched");
    if (response.ok) {
      const data = await response.json();
      // Populate the table with the fetched data
      populateDoctorScheduleTable(data);
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

// Function to populate the doctor's schedule table with data
const populateDoctorScheduleTable = (data) => {
  const tableBody = document.querySelector("#doctorScheduleTable tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  data.forEach((schedule) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${schedule.scheduleId}</td>
      <td>${schedule.dayOfWeek}</td>
      <td>${schedule.startTime}</td>
      <td>${schedule.endTime}</td>
      <td>
        <button class="btn btn-warning">Edit</button>
        <button class="btn btn-danger">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
};

// Fetch doctor's schedule data when the page loads
document.addEventListener("DOMContentLoaded", fetchDoctorScheduleData);
