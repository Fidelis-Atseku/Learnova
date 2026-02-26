const left_sidebar = document.querySelector(".left.sidebar");
const main_header = document.querySelector(".main-header");
let main_header_height = main_header.getBoundingClientRect().height;
left_sidebar.style.top = `${main_header_height + 20}px`;

window.addEventListener("resize", () => {
    main_header_height = main_header.getBoundingClientRect().height;
    left_sidebar.style.setProperty('--header-height', `${main_header_height}`);
    left_sidebar.style.top = `${main_header_height + 20}px`;
})

// -------------------------------
// Sidebars' dynamic height
// -------------------------------

const footer = document.querySelector('.main-footer');
const footerHeight = footer.getBoundingClientRect().height;

const originalSidebarHeights = new Map();

function updateOriginalSidebarHeight(){
    originalSidebarHeights.set(left_sidebar, window.innerHeight - (main_header_height + 30));
}

function updateSidebarHeight(){
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    const originalHeight = originalSidebarHeights.get(left_sidebar);

    if (scrollHeight - scrollPosition <= footerHeight + 10) {
        left_sidebar.style.height = `${originalHeight - ((footerHeight + 10) - (scrollHeight - scrollPosition))}px`;
    } else {
        left_sidebar.style.height = `${originalHeight}px`;
    }
}

updateOriginalSidebarHeight();

window.addEventListener("DOMContentLoaded", () => {
    updateOriginalSidebarHeight();
    updateSidebarHeight();
});

window.addEventListener("load", () => {
    updateOriginalSidebarHeight();
    updateSidebarHeight();
});

window.addEventListener("resize", () => {
    updateOriginalSidebarHeight();
    updateSidebarHeight();
})

window.addEventListener("scroll", () => {
    updateSidebarHeight();
});

// ---------------------
// Left sidebar collapse
// ---------------------

let left_sidebar_collapsed = true;
left_sidebar.classList.add("ls-collapsed");
const left_sidebar_collapse_btn = document.getElementById("ls-collapse-btn");


const ls_collapse_observer = new MutationObserver(() => {
    left_sidebar_collapsed = left_sidebar.classList.contains("ls-collapsed");
});

ls_collapse_observer.observe(left_sidebar, {
    attributes: true,
    attributeFilter: ["class"]
});

function collapse_left_sidebar() {
    left_sidebar.classList.add("ls-collapsed");
    left_sidebar.classList.remove("ls-expanded");
}
function expand_left_sidebar() {
    left_sidebar.classList.remove("ls-collapsed");
    left_sidebar.classList.add("ls-expanded");
}

left_sidebar_collapse_btn.addEventListener("click", () => {

    if (left_sidebar_collapsed == false){
        collapse_left_sidebar();
    }
    else {
        expand_left_sidebar();
    }
})

const mq = window.matchMedia("(max-width: 500px)");
mq.addEventListener("change", (e) => {

    if (e.matches) {

        left_sidebar.classList.add("ls-hidden");
        if (!left_sidebar.classList.contains("collapsed")) {
            collapse_left_sidebar();
        }

    }

});

// -----------------
// Left sidebar hide
// -----------------

const ls_hamburger_btn = document.querySelector(".ls-hamburger-btn");
const indexContent = document.querySelector(".index.content");
let sidebar_hidden = true;

const ls_hide_observer = new MutationObserver(() => {

    sidebar_hidden = left_sidebar.classList.contains("ls-hidden");

});

ls_hide_observer.observe(left_sidebar, {
    attributes: true,
    attributeFilter: ["class"]
});

function hide_left_sidebar() {
    left_sidebar.classList.remove("ls-shown");
    left_sidebar.classList.add("ls-hidden");
    if (left_sidebar_collapsed == false){
        collapse_left_sidebar();
    }
}
function show_left_sidebar() {
    left_sidebar.classList.remove("ls-hidden");
    left_sidebar.classList.add("ls-shown");
}

ls_hamburger_btn.addEventListener("click", () => {
    if(sidebar_hidden){
        show_left_sidebar();
    }
    else {
        hide_left_sidebar();
    }
})

// -------------------------------
// Right sidebar dynamic height & width
// -------------------------------

const right_sidebar_collapse_btn = document.getElementById("rs-collapse-btn");
const right_sidebar = document.querySelector(".right.sidebar");
let right_sidebar_collapsed = true;

right_sidebar.classList.add("collapsed");

right_sidebar_collapse_btn.addEventListener("click", () => {
    right_sidebar_collapsed = !right_sidebar_collapsed;
    right_sidebar.classList.toggle("collapsed");
    right_sidebar.classList.toggle("expanded");
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
            if (left_sidebar_collapsed){
                this.show();
            }
        });

        this.element.addEventListener('mouseleave', () => {
            if (left_sidebar_collapsed){
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

});



// ----------------------------
// Prompt paragraph placeholder
// ----------------------------


const prompt_p = document.getElementById("prompt-p");

function updatePlaceholder() {
  if (prompt_p.textContent.trim() === ""){
    prompt_p.classList.add("empty");
  } else {
    prompt_p.classList.remove("empty");
  }
}

updatePlaceholder();

prompt_p.addEventListener("input", updatePlaceholder);
prompt_p.addEventListener("focus", updatePlaceholder);
prompt_p.addEventListener("blur", updatePlaceholder);