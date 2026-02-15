// Buttons (spans)
const registerButtons = document.querySelectorAll(".register-page-button");
const signInButtons = document.querySelectorAll(".sign-in-page-button");
const forgotPasswordButtons = document.querySelectorAll(".forgot-password-page-button");

// Content divs
const signInContent = document.querySelector(".sign-in");
const registerContent = document.querySelector(".register");
const forgotPasswordContent = document.querySelector(".forgot-password");

function showContent(showDiv) {
  [signInContent, registerContent, forgotPasswordContent].forEach(div => {
    div.style.display = div === showDiv ? "flex" : "none";
  });
}

registerButtons.forEach(btn => {
  btn.addEventListener("click", () => showContent(registerContent));
});

signInButtons.forEach(btn => {
  btn.addEventListener("click", () => showContent(signInContent));
});

forgotPasswordButtons.forEach(btn => {
  btn.addEventListener("click", () => showContent(forgotPasswordContent));
});

