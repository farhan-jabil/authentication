// login.js

const handleLogin = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get user input data from the form
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // You can add your login logic here
  const requestBody = {
    username: username,
    password: password,
  };

  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    // Login was successful, handle the response data accordingly
    const json = await response.json();
    console.log("Login successful:", json);

    // Store the token in localStorage
    localStorage.setItem("token", json.authtoken);

    // Redirect to another page
    window.location.href = "gettingUser.html";
    // Login was successful, show a normal JavaScript alert
    alert("Login successful");
  } else {
    // Login failed, handle the error response
    console.error("Login failed. Status:", response.status);
    // You can display an error message to the user if needed
  }
};

// Get the form element
const loginForm = document.getElementById("loginForm");

// Attach an event listener to the form's submit event
loginForm.addEventListener("submit", handleLogin);
