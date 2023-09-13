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

const habitsButton = document.getElementById("habits");
habitsButton.addEventListener("click", async () => {
  window.location.href = "/";
});

async function toggleUserStatus(userId) {
  const confirmed = confirm("Change user status?");

  try {
    if (confirmed) {
      const response = await fetch(`/users/toggle_user_status/${userId}`, {
        method: "PUT",
      });

      if (response.ok) {
        // Refresh the habit list after deleting
        location.reload();
      } else {
        const errorData = await response.json(); // Assuming the server sends a JSON error response
        console.error("Toggle failed:", errorData.message);
        alert(errorData.message);
      }
    }
  } catch (error) {
    console.error("Error toggling user status:", error);
    // Handle error
  }
}
