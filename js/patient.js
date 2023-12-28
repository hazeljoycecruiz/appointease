// Form Register

const reg_patient = document.getElementById("reg_patient");

reg_patient.onsubmit = async (e) => {
  e.preventDefault();

  document.querySelector("#reg_patient button").disabled = true;

  const formData = new FormData(reg_patient);

  const response = await fetch(
    "http://backend.test/api/message",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    }
  );

  if (response.ok) {
    const json = await response.json();
      console.log(json);
      
    reg_patient.reset();
  } else if (response.status === 422) {
      const json = await response.json();
      
    alert(json.message);
  }

  document.querySelector("#reg_patient button").disabled = false;
};
