// Function to handle the logout process
const handleLogout = () => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem('token');

    if (token) {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Redirect the user to the login page
        window.location.href = 'login.html';
    } else {
        // If there is no token, do nothing or handle it as needed
        console.log('No token found in localStorage. User cannot log out.');
    }
};

// Function to fetch user details using the authentication token
// Function to fetch user details using the authentication token
const fetchUserDetails = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found in localStorage.');
            return;
        }

        const response = await fetch('http://localhost:5000/api/getusers', {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const userData = await response.json();

            // Update the user details in the HTML
            const nameElement = document.getElementById('userName');
            const usernameElement = document.getElementById('userUsername');
            const emailElement = document.getElementById('userEmail');

            nameElement.textContent = userData.name;
            usernameElement.textContent = userData.username;
            emailElement.textContent = userData.email;
        } else {
            console.error('Failed to fetch user details:', response.status);
        }
    } catch (error) {
        console.error('An error occurred during user details retrieval:', error);
    }
};


// Get the "Log Out" button element by its ID
const logoutButton = document.getElementById('logoutButton');

// Attach a click event listener to the "Log Out" button
logoutButton.addEventListener('click', handleLogout);

// Call the fetchUserDetails function when the page loads
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("token")) {
        fetchUserDetails();
    }
});
