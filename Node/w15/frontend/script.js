fetch('http://localhost:3001/api/products')
  .then(response => response.json())
  .then(products => {
    const list = document.getElementById('productList');
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>$${product.price}</p>
      `;
      list.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching products:', error));
