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

const sidebar = document.querySelector(".sidebar");
const appContent = document.querySelector(".app-content");
const app = document.querySelector(".app");
const sidebarToggleBtn = document.querySelector(".app-header__button--sidebar-toggle");
const appHeaderTitle = document.querySelector(".app-header__title");
const sidebarButtons = sidebar.querySelectorAll(".sidebar__button");

// sidebar toggle
sidebarToggleBtn.addEventListener("click", (event) => {
    sidebar.classList.toggle("sidebar--collapsed");
    sidebarToggleBtn.classList.toggle("app-header__button--sidebar-toggle-collapsed");
});

document.addEventListener("click", (event) => {
   if (!sidebarToggleBtn.contains(event.target) && !sidebar.contains(event.target)) {
        sidebar.classList.add("sidebar--collapsed");
        sidebarToggleBtn.classList.add("app-header__button--sidebar-toggle-collapsed");
    }
})

sidebarButtons.forEach(button => {
    button.addEventListener("click", () => {
        sidebarButtons.forEach(Btn => {
            Btn.classList.toggle("sidebar__button--selected", Btn === button);
        });
    })
})

//sidebar dynamic height
window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.innerHeight + window.scrollY;
    const distanceFromBottom = scrollHeight - scrollPosition;

    if (distanceFromBottom <= 66) {
        const reduction = 66 - distanceFromBottom;
        sidebar.style.height = `calc(100vh - 86px - ${reduction}px)`;
    } else {
        sidebar.style.height = ``;
    }
});

// Dashboard
const dashboardFeaturedCoursesSection = document.querySelector(".dashboard__content-section--featured-courses");

// const areaButtons = dashboardFeaturedCoursesSection.querySelectorAll(".area__button");
console.log(document.querySelector(".dashboard"));
