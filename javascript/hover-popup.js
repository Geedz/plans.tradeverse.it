const linkContainer = document.getElementById("aff-link-container");
const hoverPopup = document.getElementById("hoverPopup");

// Show popup on mouse move
linkContainer.addEventListener("mousemove", (event) => {
    hoverPopup.style.display = "block";
    hoverPopup.style.opacity = 1;
});

// Hide popup when mouse leaves the container
linkContainer.addEventListener("mouseleave", () => {
    hoverPopup.style.display = "none";
    hoverPopup.style.opacity = 0;
});
