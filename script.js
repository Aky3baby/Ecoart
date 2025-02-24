// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});


document.querySelector('#about-link').addEventListener('click', function() {
    document.querySelector('.about-section').classList.add('show');
  });
  function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }

  