const url = "http://aebackend.test"

const scheduleForm = document.getElementById("doctorScheduleForm");
const scheduleTable = document.querySelector(".table tbody");

scheduleForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(scheduleForm);

  try {
    const response = await fetch(url + "/api/sch", {
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
      scheduleForm.reset();

      // Add the new schedule to the table dynamically
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${json.scheduleId}</td>
        <td>${formData.get("day_of_week")}</td>
        <td>${formData.get("start_time")}</td>
        <td>${formData.get("end_time")}</td>
        <td>
          <button class="btn btn-warning">Edit</button>
          <button class="btn btn-danger">Delete</button>
        </td>
      `;
      scheduleTable.appendChild(newRow);

      successNotification("Schedule added successfully.", 5);
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
      // Handle error, if needed
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle unexpected errors, if needed
  }
});
