export function login_js(onClose){
    const registerButtons = document.querySelectorAll(".register-page-button");
    const signInButtons = document.querySelectorAll(".sign-in-page-button");
    const forgotPasswordButtons = document.querySelectorAll(".forgot-password-page-button");

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

    const close_login_btn = document.querySelector(".close-login-btn");
    close_login_btn.addEventListener("click", () => {
        onClose();
        show_hamburger_btn();
        updateSidebarHeight();
        page_title.style.display = 'block';
    })
}
import { show_hamburger_btn } from "./index.js";
import { updateSidebarHeight } from "./index.js";
import { page_title } from "./index.js";