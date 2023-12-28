import {
  aebackendURL,
  successNotification,
  errorNotification,
} from "../utils/utils.js";

// Form Register

const reg_patient = document.getElementById("reg_patient");

reg_patient.onsubmit = async (e) => {
    e.preventDefault();

    console.log("ma click ba ni")
   

    //diable button
  document.querySelector("#reg_patient button").disabled = true;

    //get values of form (input, text area, select) set it as form-data
  const formData = new FormData(reg_patient);

    //fetch API user patient endpoint
  const response = await fetch(
    backendURL + "/api/patient",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    }
  );

    
    //get response if 200-299 status code
  if (response.ok) {
    const json = await response.json();
      console.log(json);

      //get response if 422 status code
      
    reg_patient.reset();
  } else if (response.status === 422) {
      const json = await response.json();
      
    alert(json.message);
    }
    
    //enable button
  document.querySelector("#reg_patient button").disabled = false;
 };
