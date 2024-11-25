document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("jwt");
  const current_plan = localStorage.getItem("current_plan")
  // console.log("Token from localStorage:", token);  // Add this to verify token existence

  async function validateToken(token) {
      try {
          const response = await fetch('http://localhost/tradeverse/backend/php/validate_token.php', {
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
              window.location.href = "plan-login.html";
          }
      } catch (error) {
          console.error('There was a problem with token validation:', error);
          window.location.href = "plan-login.html";
      }
  }

  // Controlla se l'utente ha un piano prima di far il login, sennó, mandali ad una pagina apposita
  if (current_plan === null) {
    window.location.href = "plan-login.html";
  } 
  else if (current_plan !== "Settimanale" && current_plan !== "Mensile" && current_plan !== "Annuale") {
    window.location.href = "../no-plan.html";
  } else {
    if (!token) {
      // If there's no token, redirect to the login page
      console.error("No token found");
      window.location.href = "plan-login.html";
  } else {
      validateToken(token);
  }
  }
});
