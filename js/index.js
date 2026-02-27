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

    if (!left_sidebar_collapsed){
        collapse_left_sidebar();
    }
    else {
        expand_left_sidebar();
    }
})

const mq = window.matchMedia("(max-width: 500px)");
if (mq.matches){
    left_sidebar.classList.add("ls-hidden");
}
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

export function show_hamburger_btn() {
    ls_hamburger_btn.style.display = 'flex';
}

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
    ls_hamburger_btn.style.display = 'none';
});



// ----------------------------
// Prompt paragraph placeholder
// ----------------------------


const prompt_p = document.getElementById("prompt-p");

function updatePlaceholder() {
    if (prompt_p.textContent.trim() === ""){
        prompt_p.classList.add("empty");
    }
    else {
        prompt_p.classList.remove("empty");
    }
}

updatePlaceholder();

prompt_p.addEventListener("input", updatePlaceholder);
prompt_p.addEventListener("focus", updatePlaceholder);
prompt_p.addEventListener("blur", updatePlaceholder);

// -------------
// Role dropdown
// -------------

const role_btn = document.querySelector("#role-btn");
const role_dropdown = document.querySelector(".role-dropdown");
const role_dropdown_arrow = document.querySelector(".dropdown-arrow");
let role_dropdown_hidden = true;

function flip_dropdown_arrow(dropdown_arrow, flipped){
    dropdown_arrow.style.transform = flipped ? "scaleY(1)" : "scaleY(-1)";
}

function hide_role_dropdown() {
    role_dropdown.classList.remove("rd-shown");
    role_dropdown.classList.add("rd-hidden");
    flip_dropdown_arrow(role_dropdown_arrow, !role_dropdown_hidden);
    role_btn.style.backgroundColor = "";
    role_dropdown_hidden = true;
}
function show_role_dropdown() {
    role_dropdown.classList.remove("rd-hidden");
    role_dropdown.classList.add("rd-shown");
    flip_dropdown_arrow(role_dropdown_arrow, !role_dropdown_hidden);
    role_btn.style.backgroundColor = "hsla(187, 71%, 50%, 0.3)";
    role_dropdown_hidden = false;
}

role_dropdown.addEventListener("blur", () => {
    // set(hide_role_dropdown(), 100);
    hide_role_dropdown();
})

role_btn.addEventListener("click", () => {
    if(role_dropdown_hidden){
        show_role_dropdown();
    }
    else {
        hide_role_dropdown();
    }
})


// ----------------------
// Sidebar content toggle
// ----------------------

const student_role_btn = document.querySelector(".student-role-btn");
const instructor_role_btn = document.querySelector(".instructor-role-btn");
const admin_role_btn = document.querySelector(".admin-role-btn");
const student_sidebar_content = document.querySelector(".student-sidebar-content");
const instructor_sidebar_content = document.querySelector(".instructor-sidebar-content");
const admin_sidebar_content = document.querySelector(".admin-sidebar-content");

student_role_btn.addEventListener("click", () => {
    role_toggle("student");
    hide_role_dropdown();
})
instructor_role_btn.addEventListener("click", () => {
    role_toggle("instructor");
    hide_role_dropdown();
})
admin_role_btn.addEventListener("click", () => {
    role_toggle("admin");
    hide_role_dropdown();
})

function role_toggle(role){
    student_sidebar_content.style.display = role === "student" ? "flex" : "none";
    instructor_sidebar_content.style.display = role === "instructor" ? "flex" : "none";
    admin_sidebar_content.style.display = role === "admin" ? "flex" : "none";
}

// ----------------
// Sidebar overflow
// ----------------

const scrollable_observer = new ResizeObserver(() => {
    const isOverflowing = left_sidebar.scrollHeight > left_sidebar.clientHeight || left_sidebar.scrollWidth > left_sidebar.clientWidth;
    if (isOverflowing){
        left_sidebar.classList.add("scrolling");
    }
    else {
        left_sidebar.classList.remove("scrolling");
    }
})
scrollable_observer.observe(left_sidebar);

// ----------------------------
// left sidebar button dropdown
// ----------------------------

const ls_btn_dropdown = document.querySelector(".ls-btn-dropdown");
const ls_courses = document.querySelector(".ls-courses");
const ls_btn_dropdown_arrow = document.querySelector(".ls-btn-dropdown-arrow");
let ls_btn_dropdown_arrow_flipped = false;

ls_btn_dropdown.addEventListener("click", () => {
    flip_dropdown_arrow(ls_btn_dropdown_arrow, ls_btn_dropdown_arrow_flipped);
    ls_btn_dropdown_arrow_flipped = !ls_btn_dropdown_arrow_flipped;
})
