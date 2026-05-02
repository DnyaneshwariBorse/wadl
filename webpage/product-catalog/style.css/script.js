// 📦 Array of products (your data)
const products = [
    {
        name: "Wireless Headphones",
        price: 7999,
        desc: "Noise-cancelling over-ear headphones",
        img: "https://via.placeholder.com/80"
    },
    {
        name: "Smartwatch",
        price: 12999,
        desc: "Fitness tracking smartwatch",
        img: "https://via.placeholder.com/80"
    },
    {
        name: "Gaming Mouse",
        price: 2499,
        desc: "Ergonomic gaming mouse",
        img: "https://via.placeholder.com/80"
    },
    {
        name: "Laptop Stand",
        price: 1999,
        desc: "Adjustable aluminium stand",
        img: "https://via.placeholder.com/80"
    },
    // 👉 You can add more products here to test pagination
];

// 🔢 Keeps track of current page number
let currentPage = 1;

// ✅ If products > 10 → show 5 per page
// ✅ Else → show all products (no pagination needed)
const rowsPerPage = products.length > 10 ? 5 : products.length;


// 📌 Function to display products in table
function displayProducts() {

    // Get table body element
    const tableBody = document.getElementById("tableBody");

    // Clear previous data before adding new
    tableBody.innerHTML = "";

    let itemsToDisplay;

    // ✅ If total products <= 10 → show all
    if (products.length <= 10) {
        itemsToDisplay = products;

    } else {
        // ✅ Apply pagination logic

        // Calculate starting index
        const start = (currentPage - 1) * rowsPerPage;

        // Calculate ending index
        const end = start + rowsPerPage;

        // Get only required products for current page
        itemsToDisplay = products.slice(start, end);
    }

    // 🔁 Loop through products and create table rows
    itemsToDisplay.forEach(product => {

        // Create row using template literal
        const row = `
            <tr>
                <td><img src="${product.img}"></td>
                <td>${product.name}</td>
                <td>₹${product.price}</td>
                <td>${product.desc}</td>
            </tr>
        `;

        // Add row to table
        tableBody.innerHTML += row;
    });
}


// 📌 Function to create pagination buttons
function setupPagination() {

    // Get pagination container
    const paginationDiv = document.getElementById("pagination");

    // ❌ If products <= 10 → no pagination needed
    if (products.length <= 10) {
        paginationDiv.innerHTML = "";
        return;
    }

    // Calculate total number of pages
    const pageCount = Math.ceil(products.length / rowsPerPage);

    // Clear old buttons
    paginationDiv.innerHTML = "";

    // 🔁 Create buttons for each page
    for (let i = 1; i <= pageCount; i++) {

        const btn = document.createElement("button");

        // Set button text (page number)
        btn.innerText = i;

        // When button is clicked
        btn.addEventListener("click", () => {

            // Update current page
            currentPage = i;

            // Refresh displayed products
            displayProducts();
        });

        // Add button to pagination div
        paginationDiv.appendChild(btn);
    }
}


// 🚀 Run when page loads
displayProducts();   // Show products
setupPagination();   // Create pagination buttons