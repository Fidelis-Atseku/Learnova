const left_sidebar = document.querySelector(".left.sidebar");
const main_header = document.querySelector(".main-header");
const ls_hamburger_btn = document.querySelector(".ls-hamburger-btn");
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

function getOriginalSidebarHeight(){
    return window.innerHeight - (main_header_height + 30);
}

export function updateSidebarHeight(){
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    const originalHeight = getOriginalSidebarHeight();

    if (scrollHeight - scrollPosition <= footerHeight + 10) {
        left_sidebar.style.height = `${originalHeight - ((footerHeight + 10) - (scrollHeight - scrollPosition))}px`;
    } else {
        left_sidebar.style.height = `${originalHeight}px`;
    }
}

// updateOriginalSidebarHeight();

window.addEventListener("DOMContentLoaded", () => {
    getOriginalSidebarHeight();
    updateSidebarHeight();
});

window.addEventListener("load", () => {
    getOriginalSidebarHeight();
    updateSidebarHeight();
});

window.addEventListener("resize", () => {
    getOriginalSidebarHeight();
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
    if (window.innerWidth < 500){
        ls_hamburger_btn.style.display = 'flex';
    }
    else {
        ls_hamburger_btn.style.display = 'none';
    }
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
// Left sidebar button hover effect content toggle
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
export const page_title = document.querySelector(".page-title");
const index_content = document.querySelectorAll(".index.content > *");

ls_btn.forEach((btn, index) => {
    new ls_btn_hover(btn, ls_btn_txt[index].textContent);

    btn.addEventListener("click", () => {
        page_title.textContent = ls_btn_txt[index].textContent;
        let page_class = ls_btn_txt[index].textContent.replace(" ", "-").toLowerCase() + "-page";
        console.log(page_class);

        index_content.forEach(page => {
            page.style.display = page.classList.contains(page_class) ? "block" : "none";
        })
    })

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
    page_title.style.display = 'none';
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
const role_dropdown_arrow = document.querySelector(".role-dropdown-arrow");
let role_dropdown_hidden = true;

function flip_dropdown_arrow(dropdown_arrow, flipped){
    if (!dropdown_arrow) return;
    dropdown_arrow.style.transform = !flipped ? "scaleY(1)" : "scaleY(-1)";
}

function hide_role_dropdown() {
    role_dropdown.classList.remove("rd-shown");
    role_dropdown.classList.add("rd-hidden");
    flip_dropdown_arrow(role_dropdown_arrow, role_dropdown_hidden);
    role_btn.style.backgroundColor = "";
    role_dropdown_hidden = true;
}
function show_role_dropdown() {
    role_dropdown.classList.remove("rd-hidden");
    role_dropdown.classList.add("rd-shown");
    flip_dropdown_arrow(role_dropdown_arrow, role_dropdown_hidden);
    role_btn.style.backgroundColor = "hsla(187, 71%, 50%, 0.3)";
    role_dropdown_hidden = false;
}

document.addEventListener("click", (e) => {
    const allButtons = [...role_dropdown.querySelectorAll("button"), role_btn];
    const clickedOutside = allButtons.every(btn => !btn.contains(e.target))
    if(clickedOutside && role_dropdown_hidden == false){
        hide_role_dropdown();
    }
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

function switch_role_btn_icon(btn) {
    const role_btn_icon = document.querySelector(".role-btn-icon");
    role_btn_icon.src = btn.src;
}

student_role_btn.addEventListener("click", () => {
    const student_role_btn_icon = document.querySelector(".student-role-btn img");
    role_toggle("student");
    switch_role_btn_icon(student_role_btn_icon);
    hide_role_dropdown();
})
instructor_role_btn.addEventListener("click", () => {
    const instructor_role_btn_icon = document.querySelector(".instructor-role-btn img");
    role_toggle("instructor");
    switch_role_btn_icon(instructor_role_btn_icon);
    hide_role_dropdown();
})
admin_role_btn.addEventListener("click", () => {
    const admin_role_btn_icon = document.querySelector(".admin-role-btn img");
    role_toggle("admin");
    switch_role_btn_icon(admin_role_btn_icon);
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
        // indexContent.style.marginLeft = "95px";
    }
    else {
        left_sidebar.classList.remove("scrolling");
        // indexContent.style.marginLeft = "85px";
    }
    // if (left_sidebar.classList.contains("scrolling")){
    //     indexContent.style.marginLeft = "95px";
    // }
    // else {
    //     indexContent.style.marginLeft = "85px";
    // }
})
scrollable_observer.observe(left_sidebar);

// ----------------
// general dropdown
// ----------------

const dropdown_set = document.querySelectorAll(".dropdown-set");

class dropdown_behaviour {
    constructor (set){
        this.set = set;
        this.set_btn = set.querySelector(".set-btn");
        this.set_dropdown = set.querySelector(".set-dropdown");
        this.dropdown_btn = this.set_dropdown.querySelectorAll(".dropdown-btn");
        this.dropdown_arrow = set.querySelector(".dropdown-arrow");
        this.label = set.querySelector(".set-label");

        this.dropdown_hidden = true;

        this.set_btn.addEventListener('click', () => {
            this.dropdown_hidden ? this.show_dropdown() : this.hide_dropdown();
        });

        document.addEventListener("click", e => {
            const allButtons = [this.set_btn, ...this.dropdown_btn];
            
            // Check if click is outside all buttons
            const clickedOutside = allButtons.every(btn => !btn.contains(e.target));
            
            if (clickedOutside && !this.dropdown_hidden && !set.classList.contains("ls-dropdown-set") && !set.classList.contains("ecp-category")){
                this.hide_dropdown();
            }

            if (set.classList.contains("ecp-category")){
                const ls_btn = set.querySelectorAll(".category-ls-btn");
                const ls_section_header = set.querySelectorAll(".dropdown-section-header")
                const allButtons = [this.set_btn, ...ls_btn, ...ls_section_header];
                const clickedOutside = allButtons.every(btn => !btn.contains(e.target));
                if(clickedOutside){
                    this.hide_dropdown();
                }
            }
        });

        this.dropdown_btn.forEach(btn => {
            btn.addEventListener('click', () => {
                if(this.set_dropdown == set.querySelector(".sort-dropdown")){
                    this.label.textContent = `Sort by ${btn.textContent.toLowerCase()}`;
                }
                else {
                    this.label.textContent = btn.textContent;
                }
                this.hide_dropdown();
            })
        })
    }

    hide_dropdown(){
        this.set_dropdown.style.display = 'none';
        this.dropdown_hidden = true;
        try {
            this.dropdown_arrow.style.transform = "scaleY(1)";
            category_dropdown_right_section.style.display = "none";
        } catch{};
        if (this.set_btn.classList.contains("ecp")){
            this.set_btn.style.backgroundColor = "";
        }
    }
    show_dropdown(){
        if (this.set.classList.contains("ecp-category")){
            this.set_dropdown.style.display = 'flex';
        }
        else {
            this.set_dropdown.style.display = 'block';
        }

        this.dropdown_hidden = false;
        try {
            this.dropdown_arrow.style.transform = "scaleY(-1)";
        } catch{};
        if (this.set_btn.classList.contains("ecp")){
            this.set_btn.style.backgroundColor = "hsla(187, 71%, 50%, 0.3)";
        }
    }

}

dropdown_set.forEach(set => {
    new dropdown_behaviour(set);
})

// ---------------------
// ecp category dropdown
// ---------------------

const exploreCoursesPage = document.querySelector(".explore-courses-page");
const category_dropdown_left_section_btns = exploreCoursesPage.querySelectorAll(".left-section .category-ls-btn");
const category_dropdown_right_section = exploreCoursesPage.querySelector("#ecp-category-sd .right-section");
const category_dropdown_right_section_content = category_dropdown_right_section.querySelectorAll(".rs-dropdown");
category_dropdown_left_section_btns.forEach(btn => {
    // let dropdown_hidden = true;
    btn.addEventListener("click", (event) => {
        const btn_id = btn.getAttribute("id");
        const dropdown_class = btn_id.replace("btn", "dropdown");
        const btn_dropdown = exploreCoursesPage.querySelector(`.${dropdown_class}`);

        category_dropdown_left_section_btns.forEach(Btn => {
            if (Btn !== btn){
                Btn.style.backgroundColor = "";
            }
            else {
                Btn.style.backgroundColor = "hsl(235, 66%, 70%)";
            }
        })
        
        btn_dropdown.style.display = "block";
        category_dropdown_right_section.style.display = "block";
        // console.log(dropdown_hidden);

        category_dropdown_right_section_content.forEach(dropdown => {
            if (dropdown !== btn_dropdown){
                dropdown.style.display = "none";
            }
        })
    })
})
category_dropdown_right_section_content.forEach(dropdown => {
    dropdown.addEventListener("click", () => {
    })
})

// Slider

function ecpFeaturedCoursesSectionSliders() {
    const ecpFeaturedCoursesSection = exploreCoursesPage.querySelector(".featured-courses-section");
    const slideContainers = ecpFeaturedCoursesSection.querySelectorAll(".slideContainer");

    slideContainers.forEach((slideContainer) => {
        const indicators = slideContainer.nextElementSibling.querySelectorAll("div");
        const slides = Array.from(slideContainer.children);
        const firstSlide = slides[0];
        const clone = firstSlide.cloneNode(true);
        slideContainer.appendChild(clone);

        let interval;
        let itemWidth = 0;

        function updateItemWidth() {
            itemWidth = firstSlide.getBoundingClientRect().width;
        }

        requestAnimationFrame(updateItemWidth);
        window.addEventListener("resize", updateItemWidth);

        function startAutoScroll() {
            clearInterval(interval);
            interval = setInterval(() => {
                slideContainer.scrollBy({
                    left: itemWidth,
                    behavior: "smooth",
                });
            }, 10000);
        }

        function updateIndicators() {
            if (itemWidth === 0) return;
            let index = Math.round(slideContainer.scrollLeft / itemWidth);
            if (index >= slides.length) index = 0;
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle("active", i === index);
            });
        }

        slideContainer.addEventListener("scroll", () => {
            if (itemWidth === 0) return;

            const tolerance = 1;
            if (slideContainer.scrollLeft >= slideContainer.scrollWidth - itemWidth - tolerance) {
                slideContainer.scrollTo({
                    left: 0,
                    behavior: "auto",
                });
            }

            updateIndicators();

            clearInterval(interval);
            setTimeout(startAutoScroll, 150);
        });

        startAutoScroll();
    });
}

ecpFeaturedCoursesSectionSliders();