import { navigate } from "./router.js";

function headerTempBtn(){
    const secondary = document.querySelector(".app-header__right--secondary");
    const primary = document.querySelector(".app-header__right--primary");
    const toggle = document.querySelector(".app-header-toggle");
    let bool = false;
    toggle.addEventListener("click", () => {
        primary.style.display = bool ? "flex" : "none";
        secondary.style.display = bool ? "none" : "flex";
        bool = !bool;
    })
}
headerTempBtn();

const sidebarContent = document.querySelector(".sidebar__content");
const sidebar = document.querySelector(".sidebar");
export const appContent = document.querySelector(".app-content");
const app = document.querySelector(".app");
const sidebarToggleBtn = document.querySelector(".app-header__button--sidebar-toggle");
export const appHeaderTitle = document.querySelector(".app-header__title");
const appHeaderRight = document.querySelector(".app-header")
export const sidebarButtons = sidebar.querySelectorAll(".sidebar__button");

// highlight sidebar button
export function highlightSidebarButton(highlightButton){
    const buttons = sidebar.querySelectorAll(".sidebar__button");

    buttons.forEach(btn => {
        btn.classList.toggle("sidebar__button--selected", btn === highlightButton);
    });
}

// update sidebar height
export function updateSidebarHeight(){
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.innerHeight + window.scrollY;
    const distanceFromBottom = scrollHeight - scrollPosition;
    const pageFooter = document.querySelector(".app-footer");

    let footerHeight = pageFooter.offsetHeight;

    if (distanceFromBottom <= (footerHeight + 10)) {
        const reduction = (footerHeight + 10) - distanceFromBottom;
        sidebar.style.height = `calc(100vh - 86px - ${reduction}px)`;
    } else {
        sidebar.style.height = ``;
    }
}

// initialize sidebar
function initializeSidebar(){

    // sidebar collapse toggle
    sidebarToggleBtn.addEventListener("click", () => {
        const sidebarButtons = sidebar.querySelectorAll(".sidebar__button");
        sidebar.classList.toggle("sidebar--collapsed");
        sidebarToggleBtn.classList.toggle("app-header__button--sidebar-toggle-collapsed");

        if(!sidebar.classList.contains("sidebar--collapsed")){
            sidebarButtons.forEach(button => {
                button.removeAttribute("data-tooltip");
            })
        }
        else {
            sidebarButtons.forEach(button => {
                const label = button.querySelector(".sidebar__button-label").textContent;
                button.setAttribute("data-tooltip", `${label}`)
            })
        }
    });

    // collapse sidebar if clicked outside sidebar and toggle button
    document.addEventListener("click", (event) => {
    if (!sidebarToggleBtn.contains(event.target) && !sidebar.contains(event.target)) {
            sidebar.classList.add("sidebar--collapsed");
            sidebarToggleBtn.classList.add("app-header__button--sidebar-toggle-collapsed");
        }
    })

    //sidebar dynamic height
    window.addEventListener("scroll", () => {
        updateSidebarHeight();
    });
};

// ** Event delegations

// ** event delegation for dropdown buttons 
document.addEventListener("click", (event) => {
    const dropdownSetButton = event.target.closest(".dropdown-set__button");
    const dropdownButton = event.target.closest(".dropdown-button");
    const dropdownSet = event.target.closest(".dropdown-set");

    function showDropdown(dropdown){
        const dropdownSetButton = dropdown.previousElementSibling;
        const dropdownArrow = dropdownSetButton.querySelector(".dropdown-set__arrow");
        dropdownSetButton.style.borderColor = "#26C6DA";
        dropdown.style.display = "block";
        dropdownArrow.style.transform = "scaleY(-1)";
    }

    function hideDropdown(dropdown){
        const dropdownSetButton = dropdown.previousElementSibling;
        const dropdownArrow = dropdownSetButton.querySelector(".dropdown-set__arrow");
        dropdownSetButton.style.borderColor = "";
        dropdown.style.display = "none";
        dropdownArrow.style.transform = "scaleY(1)";
    }
    
    if(dropdownSetButton){
        const dropdownSet = dropdownSetButton.parentElement;
        const setDropdown = dropdownSet.querySelector(".dropdown-set__dropdown");
        let dropdownHidden = getComputedStyle(setDropdown).display === "none";

        if (dropdownHidden){
            showDropdown(setDropdown);
        }
        else {
            hideDropdown(setDropdown);
        }

        const setDropdowns = document.querySelectorAll(".dropdown-set__dropdown");
        setDropdowns.forEach(dropdown => {
            if(dropdown !== setDropdown){
                hideDropdown(dropdown);
            }
        })        
    }
    else if(dropdownButton){
        const setDropdown = dropdownButton.parentElement;
        const dropdownButtons = setDropdown.querySelectorAll(".dropdown-button");

        dropdownButtons.forEach(button => {
            button.classList.toggle("dropdown-button--selected", button === dropdownButton);
        });

        hideDropdown(setDropdown);
    }
    else if(dropdownSet) return;
    else {
        const setDropdowns = document.querySelectorAll(".dropdown-set__dropdown");
        setDropdowns.forEach(dropdown => {
            hideDropdown(dropdown);
        })
    }
}); // event delegation for dropdown buttons **


document.addEventListener("click", (event) => {
    const sliderGridToggleButton = event.target.closest(".slider-grid-toggle-button");
    const scrollButton = event.target.closest("[data-scroll]")

    if(sliderGridToggleButton){
        sliderGridToggleButton.classList.toggle("slider");
        sliderGridToggleButton.classList.toggle("grid");

        let isSlider = sliderGridToggleButton.classList.contains("slider");
        let isGrid = sliderGridToggleButton.classList.contains("grid");
        if(isSlider){
            sliderGridToggleButton.dataset.tooltip = "Switch to slider view";
        }
        if(isGrid){
            sliderGridToggleButton.dataset.tooltip = "Switch to grid view";
        }
        tooltip.textContent = sliderGridToggleButton.dataset.tooltip;
        positionTooltip(sliderGridToggleButton);
    }
    else if(scrollButton){
        const scrollPosition = scrollButton.dataset.scroll;
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        })
    }
    else return;
})

// tooltips
const tooltip = document.createElement("div");
tooltip.className = "tooltip";
document.body.appendChild(tooltip);
let tooltipTimeout;
const tooltipPadding = 4;

function showTooltip(){
    tooltip.style.transition = "";
    tooltipTimeout = setTimeout(() => {
        tooltip.style.opacity = "1";
    }, 1000);
}
function hideTooltip(){
    clearTimeout(tooltipTimeout);
    tooltip.style.transition = "none";
    tooltip.style.opacity = "0";
}

function positionTooltip(tooltipElement){
    const teRect = tooltipElement.getBoundingClientRect();
    tooltip.style.left = `${teRect.left}px`;
    tooltip.style.top = `${teRect.top - tooltip.offsetHeight - tooltipPadding}px`;

    const ttRect = tooltip.getBoundingClientRect();

    // move to bottom if too high
    if (ttRect.top < tooltipPadding){
        tooltip.style.top = `${ttRect.bottom + tooltip.offsetHeight + 8}px`;
    }

    // clamp left
    if (ttRect.left < tooltipPadding){
        tooltip.style.left = `${tooltipPadding}px`;
    }

    // clamp right
    if (ttRect.right > window.innerWidth - tooltipPadding){
        tooltip.style.left = `${window.innerWidth - tooltip.offsetWidth - (tooltipPadding + 18)}px`;
    }
}

document.addEventListener("mouseover", (event) => {
    const tooltipElement = event.target.closest("[data-tooltip]");
    if(tooltipElement){
        if(tooltipElement.contains(event.relatedTarget)) return;
        tooltip.textContent = tooltipElement.dataset.tooltip;
        showTooltip();

        positionTooltip(tooltipElement);
    }
    else return;
})

document.addEventListener("mouseout", (event) => {
    const tooltipElement = event.target.closest("[data-tooltip]");
    if(tooltipElement){
        if(tooltipElement.contains(event.relatedTarget)) return;
        hideTooltip();
    }
    else return;
})

// Event delegations **


const publicHeaderRight = document.querySelector(".app-header__right--public");
const authenticatedHeaderRight = document.querySelector(".app-header__right--authenticated");

// render page
async function renderPage(page) {
    const pageFooter = document.querySelector(".app-footer");
    // Toggle header right section
    if (page === "public") {
        publicHeaderRight.style.display = "flex";
        authenticatedHeaderRight.style.display = "none";
    } else if (page === "authenticated") {
        publicHeaderRight.style.display = "none";
        authenticatedHeaderRight.style.display = "flex";
    }

    // Load sidebar
    try {
        const res = await fetch(`/${page}/sidebar.html`);
        const html = await res.text();

        sidebarContent.innerHTML = html;
    } catch (err) {
        console.error("Failed to load sidebar:", err);
    }
    initializeSidebar();

    // Add event delegation to route links in the rendered page
    document.addEventListener("click", (event) => {
        const link = event.target.closest("[data-route]");
        if (!link) return;

        const route = link.dataset.route;
        const scrollPosition = document.documentElement.scrollTop;
        navigate(page, route);


        const pageButton = document.querySelector(`.sidebar__button--${route}`);
        highlightSidebarButton(pageButton);
    });

    // Load footer
    try {
        const res = await fetch(`/${page}/footer.html`);
        const html = await res.text();

        pageFooter.innerHTML = html;
    } catch(err){
        console.error("Failed to load footer:", err);
    }

    // Initialize navigation
    navigate(page, "explore-courses");
}

renderPage("public");



