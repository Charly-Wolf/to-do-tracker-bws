const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", async () => {
  try {
    const response = await fetch("/logout", {
      method: "POST",
    });

    if (response.ok) {
      // Clear any local storage or other client-side data if needed
      window.location.href = "/login"; // Redirect to the login page after successful logout
    } else {
      const data = await response.json();
      console.log(data.message);
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
});
