// Toggle mobile menu
document.addEventListener('DOMContentLoaded', function() {
  // ========== Menu Toggle Functionality ==========
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      const nav = document.querySelector('nav ul');
      if (nav) {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      }
    });
  }

  // ========== About Link Functionality ==========
  const aboutLink = document.querySelector('#about-link');
  if (aboutLink) {
    aboutLink.addEventListener('click', function() {
      const aboutSection = document.querySelector('.about-section');
      if (aboutSection) {
        aboutSection.classList.add('show');
      }
    });
  }

  // ========== Search Functionality ==========
  window.performSearch = function() {
    const searchTerm = document.getElementById("searchInput")?.value.toLowerCase() || '';
    const category = document.getElementById("categoryFilter")?.value || 'all';
    
    const products = document.querySelectorAll(".masonry-item");
    let hasResults = false;
  
    products.forEach(product => {
      const productName = product.querySelector("h3")?.textContent.toLowerCase() || '';
      const productCategory = product.getAttribute("data-category") || "other";
      const isVisible = 
        (productName.includes(searchTerm) || searchTerm === "") &&
        (category === "all" || productCategory === category);
      
      product.style.display = isVisible ? "block" : "none";
      if (isVisible) hasResults = true;
    });
  
    if (!hasResults) {
      alert("No products found. Try a different search!");
    }
  };

  // ========== Cart Functionality ==========
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function updateCartCounter() {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
      const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
      cartBadge.textContent = totalItems;
    }
  }
  
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const product = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: parseFloat(this.dataset.price) || 0,
        image: this.dataset.image,
        quantity: 1
      };
      
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push(product);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCounter();
      alert(`${product.name} added to cart!`);
    });
  });

  // ========== Cart Page Functionality ==========
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  
  if (cartItemsEl && cartTotalEl) {
    function renderCart() {
      if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalEl.textContent = 'Ghc0';
        return;
      }
      
      let total = 0;
      cartItemsEl.innerHTML = '';
      
      cart.forEach(item => {
        const itemTotal = (item.price || 0) * (item.quantity || 0);
        total += itemTotal;
        
        cartItemsEl.innerHTML += `
          <div class="cart-item">
            <img src="${item.image || ''}" alt="${item.name || 'Product'}">
            <div>
              <h3>${item.name || 'Unnamed Product'}</h3>
              <p>Price: Ghc${item.price || 0}</p>
              <p>Quantity: ${item.quantity || 0}</p>
              <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
          </div>
        `;
      });
      
      cartTotalEl.textContent = `Ghc${total.toFixed(2)}`;
    }
    
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-item')) {
        const id = e.target.dataset.id;
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCounter();
      }
    });
    
    renderCart();
  }

  // ========== Carousel Functionality ==========
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const carouselNavigation = document.querySelectorAll('.carousel-navigation button');
  const carouselIndicators = document.querySelectorAll('.carousel-indicators button');
  
  if (carouselSlides.length > 0) {
    let currentSlideIndex = 0;
    
    function updateCarousel() {
      carouselSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlideIndex);
      });
      
      if (carouselIndicators.length > 0) {
        carouselIndicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === currentSlideIndex);
        });
      }
    }
    
    if (carouselNavigation.length > 0) {
      carouselNavigation.forEach(button => {
        button.addEventListener('click', () => {
          if (button.classList.contains('prev-button')) {
            currentSlideIndex = (currentSlideIndex - 1 + carouselSlides.length) % carouselSlides.length;
          } else {
            currentSlideIndex = (currentSlideIndex + 1) % carouselSlides.length;
          }
          updateCarousel();
        });
      });
    }
    
    if (carouselIndicators.length > 0) {
      carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          currentSlideIndex = index;
          updateCarousel();
        });
      });
    }
    
    // Initialize
    updateCarousel();
    
    // Auto-rotate if needed
    const carouselInterval = setInterval(() => {
      if (carouselNavigation.length > 1) {
        currentSlideIndex = (currentSlideIndex + 1) % carouselSlides.length;
        updateCarousel();
      }
    }, 5000);
  }

  // Initialize cart counter
  updateCartCounter();
  console.log("All scripts loaded successfully!");
});
document.querySelector('.hamburger').addEventListener('click', function() {
  document.querySelector('nav ul').classList.toggle('show');
});
function addItemToCart(item) {
  cart.push(item);
  updateCartUI();
}
function removeItemFromCart(itemIndex) {
  cart.splice(itemIndex, 1);
  updateCartUI();
}
function updateCartUI() {
  // Update badge
  document.getElementById('cart-badge').textContent = cart.length;

  // Update cart list
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x ${item.quantity} = $${item.price * item.quantity}
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Update total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  document.getElementById('cart-total').textContent = `Total: $${total}`;
}
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-btn')) {
    removeItemFromCart(event.target.dataset.index);
  }
});