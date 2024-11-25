function setCookie(name, value, days) {
  let expires = "";
  if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=.tradeverse.it; Secure; SameSite=None";
}

document.getElementById('login-form').addEventListener('submit', async (event) => {
  
  event.preventDefault(); // Prevent the default form submission
  
  const email = document.getElementById("userfield").value;
  const password = document.getElementById("passfield").value;

  try {
    const response = await fetch('https://api.tradeverse.it/php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userfield: email,
                              passfield: password,})
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();

    const errorMessageDiv = document.getElementById("error-message");

    if (data.message === "Login successful") {

      localStorage.removeItem('referralCode');

      setCookie("jwt", data.token, (1/24)); // Expires in 1 day, adjust as needed
      setCookie("current_plan", data.current_plan, 1);
      
      window.location.href = "https://plans.tradeverse.it/";

      errorMessageDiv.style.display = 'none';
      errorMessageDiv.textContent = '';

    } else {

      console.error(data.message);
      
      errorMessageDiv.style.display = 'block';
      errorMessageDiv.textContent = data.message;
    }
} 
    catch (error) {
    console.error('There was a problem with the login process:', error);
}
})