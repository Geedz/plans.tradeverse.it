function getCookie(name) {
  let nameEQ = name + "=";
  let cookiesArray = document.cookie.split(';');
  for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i];
      while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length, cookie.length);
      }
  }
  return null;
}


document.addEventListener("DOMContentLoaded", async function () {
  // Assume you already have the token stored somewhere, e.g., in localStorage
  const token = getCookie("jwt");
  
    // Check if the token exists
    if (!token) {
        console.error("No token found");
        return;
    }
  
    try {
        // Make a POST request to the PHP endpoint
        const response = await fetch('https://api.tradeverse.it/php/dashboard_update.php', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // Parse the response as JSON
        const data = await response.json();
  
        if (data.valid === false) {
            console.error("Error from server: ", data.message);
            return;
        } else {
          const name = data.name;

          document.getElementById("account-btn").textContent = `@${name}`;
        }
    } catch (error) {
        console.error("Failed to fetch header update data: ", error);
    }
  
  });
  