// Buttons (spans)
const registerButtons = document.querySelectorAll(".register-page-button");
const signInButtons = document.querySelectorAll(".sign-in-page-button");
const forgotPasswordButtons = document.querySelectorAll(".forgot-password-page-button");

// Content divs
const signInContent = document.querySelector(".sign-in");
const registerContent = document.querySelector(".register");
const forgotPasswordContent = document.querySelector(".forgot-password");

// Helper function to show one content and hide the others
function showContent(showDiv) {
  [signInContent, registerContent, forgotPasswordContent].forEach(div => {
    div.style.display = div === showDiv ? "flex" : "none";
  });
}

// Add event listeners to all register buttons
registerButtons.forEach(btn => {
  btn.addEventListener("click", () => showContent(registerContent));
});

// Add event listeners to all sign-in buttons
signInButtons.forEach(btn => {
  btn.addEventListener("click", () => showContent(signInContent));
});

// Add event listeners to all forgot-password buttons
forgotPasswordButtons.forEach(btn => {
  btn.addEventListener("click", () => showContent(forgotPasswordContent));
});
