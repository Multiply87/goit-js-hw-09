const form = document.querySelector('.feedback-form');
const formData = {};

document.addEventListener("DOMContentLoaded", () => {
  loadFormData();
  setHandlerForm();
});

function setHandlerForm() {
  form.addEventListener("input", (event) => {
    const target = event.target;
    formData[target.name] = target.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));    
  });

  document.querySelector(".feedback-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!formData.email?.trim() || !formData.message?.trim()) {
      alert("Fill please all fields");
      return;
    }
    console.log(formData);
    formData.email = "";
    formData.message = "";
    localStorage.removeItem("feedback-form-state");
    document.querySelector(".feedback-form").reset();
  });
}

function loadFormData() {
  const savedData = localStorage.getItem("feedback-form-state");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    for (const [name, value] of Object.entries(parsedData)) {
      formData[name] = value;
      const input = document.querySelector(`.feedback-form [name="${name}"]`);
      if (input) {
        input.value = value;
      } 
    }
  }
}