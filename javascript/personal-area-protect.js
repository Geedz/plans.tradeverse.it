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

document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the token from localStorage
  const token = getCookie("jwt");
  const current_plan = getCookie("current_plan");
  console.log(token);  // Add this to verify token existence

  async function validateToken(token) {
      try {
          const response = await fetch('https://api.tradeverse.it/php/validate_token.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          });

          if (!response.ok) {
              throw new Error('Token validation failed.');
          }

          const data = await response.json();
          // console.log("Validation Response: ", data);

          if (data.valid !== true) {
              // If the token is not valid, redirect to the login page
              window.location.href = "https://plans.tradeverse.it/plan-login.html";
          }
      } catch (error) {
          console.error('There was a problem with token validation:', error);
          window.location.href = "https://plans.tradeverse.it/plan-login.html";
      }
  }

  // Controlla se l'utente ha un piano prima di far il login, sennó, mandali ad una pagina apposita
  if (current_plan === null) {
    window.location.href = "https://plans.tradeverse.it/";
  } 
  else if (current_plan !== "Settimanale" && current_plan !== "Mensile" && current_plan !== "Annuale" && current_plan !== "A Vita") {
    window.location.href = "https://plans.tradeverse.it/";
  } else {
    window.location.href = "https://tradeverse.it/login.html";
    if (!token) {
      // If there's no token, redirect to the login page
      console.error("No token found");
      window.location.href = "https://tradeverse.it/login.html";
  } else {
      validateToken(token);
  }
  }
});
