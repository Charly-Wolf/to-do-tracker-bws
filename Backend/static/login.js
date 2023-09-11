const loginForm = document.getElementById("login-form");
const errorMessageDiv = document.getElementById("error-message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Include cookies with the request
    });

    if (response.ok) {
      const data = await response.json();
      //localStorage.setItem("token", data.token);

      window.location.href = "/"; // Redirect to the main app page
    } else {
      //   alert("Wrong username and/or password");
      const data = await response.json();
      errorMessageDiv.textContent = data.message;
      console.error("Login failed");
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
});
