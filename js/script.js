// Load the header HTML before cloning the site menu
$("#header").load("header.html");

// Hamburger menu to X animation
const toggleMenu = document.querySelector('#toggleMenu');
toggleMenu.onclick = () => {
  toggleMenu.classList.toggle("hamburger-toggle");
};