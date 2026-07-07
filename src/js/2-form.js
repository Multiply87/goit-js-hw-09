const formData = new FormData(document.querySelector(".feedback-form"));

document.addEventListener("DOMContentLoaded", () => {
  loadFormData();
  setHandlerForm();
});

function setHandlerForm() {
  document.querySelector(".feedback-form").addEventListener("input", (event) => {
    const target = event.target;
    formData.set(target.name, target.value);
    localStorage.setItem("feedback-form-state", JSON.stringify(Object.fromEntries(formData)));    
  });

  document.querySelector(".feedback-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!formData.has("email") || !formData.has("message")) {
      alert("Fill please all fields");
      return;
    }
    alert(JSON.stringify(Object.fromEntries(formData)));
    formData.delete("email");
    formData.delete("message");
    localStorage.removeItem("feedback-form-state");
    document.querySelector(".feedback-form").reset();
  });
}

function loadFormData() {
  const savedData = localStorage.getItem("feedback-form-state");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    for (const [name, value] of Object.entries(parsedData)) {
      formData.set(name, value);
      const input = document.querySelector(`.feedback-form [name="${name}"]`);
      if (input) {
        input.value = value;
      } 
    }
  }
}