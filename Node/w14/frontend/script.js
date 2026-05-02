function loadUsers() {
    const userContainer = document.getElementById("users");
    userContainer.innerHTML = "<p>Loading users...</p>";

    fetch("/api/users")
        .then(response => response.json())
        .then(data => {
            userContainer.innerHTML = "";
            if (data.length === 0) {
                userContainer.innerHTML = "<p>No users found.</p>";
                return;
            }

            data.forEach(user => {
                userContainer.innerHTML += `
                    <div class="user-card">
                        <p><strong>Name:</strong> ${user.name}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Role:</strong> ${user.role}</p>
                    </div>
                `;
            });
        })
        .catch(err => {
            userContainer.innerHTML = `<p style="color: red;">Error fetching users.</p>`;
            console.error(err);
        });
}

// Automatically load on start
window.onload = loadUsers;
