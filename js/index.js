// -------------------------------
// Sidebars' dynamic height
// -------------------------------

const sidebars = document.querySelectorAll(".sidebar");
const footer = document.querySelector('.main-footer');
const footerHeight = footer.getBoundingClientRect().height;

const originalSidebarHeights = new Map();

sidebars.forEach(sidebar => {
    if (sidebar.classList.contains("left")) {
        originalSidebarHeights.set(sidebar, sidebar.getBoundingClientRect().height);
    } else if (sidebar.classList.contains("right")) {
        originalSidebarHeights.set(sidebar, window.innerHeight - 86);
    }
});

window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    sidebars.forEach(sidebar => {
        if (sidebar.classList.contains("right") && right_sidebar_collapsed) return;

        const originalHeight = originalSidebarHeights.get(sidebar);

        if (scrollHeight - scrollPosition <= footerHeight + 10) {
            sidebar.style.height = `${originalHeight - ((footerHeight + 10) - (scrollHeight - scrollPosition))}px`;
        } else {
            sidebar.style.height = `${originalHeight}px`;
        }
    });
});

// -------------------------------
// Left sidebar dynamic width
// -------------------------------

const left_sidebar = document.querySelector(".left.sidebar");
let left_sidebar_collapsed = false;
const left_sidebar_collapse_btn = document.getElementById("ls-collapse-btn");
const left_sidebar_collapse_btn_icon = document.querySelector(".ls-collapse-icon");

left_sidebar_collapse_btn.addEventListener("click", () => {
    left_sidebar_collapsed = !left_sidebar_collapsed;
    left_sidebar.style.width = left_sidebar_collapsed ? "200px" : "75px";
    left_sidebar_collapse_btn_icon.style.transform = left_sidebar_collapsed ? "scaleX(-1)" : "scaleX(1)";
});

// -------------------------------
// Right sidebar dynamic height & width
// -------------------------------

const right_sidebar_collapse_btn = document.getElementById("rs-collapse-btn");
const right_sidebar = document.querySelector(".right.sidebar");
let right_sidebar_collapsed = true;

right_sidebar_collapse_btn.addEventListener("click", () => {
    right_sidebar_collapsed = !right_sidebar_collapsed;

    if (!right_sidebar_collapsed) {
        const expandedHeight = window.innerHeight - 86;
        originalSidebarHeights.set(right_sidebar, expandedHeight);

        const scrollHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        const footerOverlap = Math.max(0, (footerHeight + 10) - (scrollHeight - scrollPosition));
        right_sidebar.style.height = `${expandedHeight - footerOverlap}px`;
    } else {
        right_sidebar.style.height = "50px";
    }

    right_sidebar.style.position = right_sidebar_collapsed ? "fixed" : "sticky";
    right_sidebar.style.width = right_sidebar_collapsed ? "50px" : "200px";
    right_sidebar.style.top = right_sidebar_collapsed ? "" : "76px";
    right_sidebar.style.bottom = right_sidebar_collapsed ? "90px" : "10px";
    right_sidebar.style.right = right_sidebar_collapsed ? "30px" : "0";

    // -------------------------------
    // Position the collapse button
    // -------------------------------
    if (!right_sidebar_collapsed) {
        right_sidebar_collapse_btn.style.position = "absolute";
        right_sidebar_collapse_btn.style.top = "40px";
        right_sidebar_collapse_btn.style.right = "40px";
    } else {
        right_sidebar_collapse_btn.style.position = "";
        right_sidebar_collapse_btn.style.top = "";
        right_sidebar_collapse_btn.style.right = "";
    }
});

    // --------------------------------
    // Left sidebar button hover effect
    // --------------------------------

class ls_btn_hover {
    constructor(element, text){
        this.element = element;
        this.text = text;

        this.element.style.setProperty('--after-content', `"${this.text}"`);
        this.element.style.setProperty('--after-display', 'none');

        this.element.addEventListener('mouseenter', () => {
            if (!left_sidebar_collapsed){
                this.show();
            }
        });

        this.element.addEventListener('mouseleave', () => {
            if (!left_sidebar_collapsed){
                this.hide();
            }
        });

    };

    show(){
        this.element.style.setProperty('--after-display', 'inline-block');
    }

    hide(){
        this.element.style.setProperty('--after-display', 'none');
    }
}

const ls_btn = document.querySelectorAll(".ls-btn");
const ls_btn_txt = document.querySelectorAll(".ls-btn-text");

ls_btn.forEach((btn, index) => {
    new ls_btn_hover(btn, ls_btn_txt[index].textContent)
});

    // ----------------
    // Login page fetch
    // ----------------


import { login_js } from "./login.js";

const login_content = document.querySelector(".login-content");
const main_content = document.querySelector(".main-content");
const profile_button = document.getElementById("profile-btn");
const header_right_section = document.querySelector(".main-header .right-section");

fetch("login.html")
    .then(response => response.text())
    .then(html => {
        login_content.innerHTML = html;
        login_content.style.display = 'none';

        login_js(() => {
            login_content.style.display = 'none';
            main_content.style.display = 'flex';
            footer.style.display = 'block';
            header_right_section.style.display = 'flex';
        });
    });


profile_button.addEventListener("click", () => {

    footer.style.display = 'none';
    main_content.style.display = 'none';
    header_right_section.style.display = 'none';
    login_content.style.display = 'flex';


})