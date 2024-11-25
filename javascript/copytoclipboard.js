document.getElementById("aff-link-container").addEventListener("click", function() {
  var copy_text = document.getElementById("aff-link").textContent;

  navigator.clipboard.writeText(copy_text).then(() => {
    const modal = document.getElementById("pos-alert");
    modal.classList.add("show");

    setTimeout(() => {
      modal.classList.remove("show");
  }, 2000);

  }).catch(err => {
      console.error("Failed to copy text: ", err);
  });
})


