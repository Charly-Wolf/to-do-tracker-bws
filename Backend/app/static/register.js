const registerForm = document.getElementById("register-form");
const errorMessageDiv = document.getElementById("error-message");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email_reg").value;
  const name = document.getElementById("name_reg").value;
  const lastname = document.getElementById("lastname_reg").value;
  const password = document.getElementById("password_reg").value;
  const password2 = document.getElementById("password2_reg").value;

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, lastname, password, password2 }),
    });

    if (response.ok) {
      alert("User registered successfully");
      window.location.href = "/activationPending"; // Redirect to the activation pending page
    } else {
      const data = await response.json();
      errorMessageDiv.textContent = data.message;
      console.error("Registration failed");
    }
  } catch (error) {
    console.error("An error occurred during registration:", error);
  }

  document.getElementById("password").value = ""; // Reset password field
});
