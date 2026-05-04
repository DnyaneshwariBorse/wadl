document.addEventListener('DOMContentLoaded', () => {
  const endpoint = '/api/employees';

  fetch(endpoint)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      const grid = document.getElementById('employee-list');
      grid.innerHTML = ''; // Clear loading state

      if (data.length === 0) {
        grid.innerHTML = '<div class="loading-state">No employees found.</div>';
        return;
      }

      data.forEach(emp => {
        grid.innerHTML += `
          <div class="employee-card">
            <img src="${emp.image}" alt="${emp.name}">
            <div class="employee-info">
              <h2>${emp.name}</h2>
              <div class="designation">${emp.designation}</div>
              <div class="department">${emp.department}</div>
              <div class="salary">💰 $${Number(emp.salary).toLocaleString()}</div>
            </div>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      const grid = document.getElementById('employee-list');
      grid.innerHTML = `<div class="loading-state">Error loading directory: ${err.message}. Please ensure the Node server is running.</div>`;
    });
});
