// signup.js

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get user input data from the form
    const name = document.getElementById("signupName").value;
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    // Create an object with the user's data
    const userData = {
        name: name,
        username: username,
        email: email,
        password: password
    };

    try {
        // Send a POST request to your server for user registration
        const response = await fetch("http://localhost:5000/api/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert("Registration successful. You can now log in.");
            // Redirect to the login page
            window.location.href = "login.html";
        } else {
            // Registration failed, show an error message to the user
            console.error("Registration failed. Status:", response.status);
            alert("Registration failed. Please try again later.");
        }
    } catch (error) {
        // Handle network errors or other unexpected errors
        console.error("An error occurred:", error);
        alert("An error occurred. Please try again later.");
    }
});

