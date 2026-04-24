export function init(){
    const exploreCourses = document.querySelector(".explore-courses");
    const filterButton = exploreCourses.querySelector("button.filter-toggle");
    const moreFiltersSection = exploreCourses.querySelector(".more-filters");
    const mainRightSection = exploreCourses.querySelector(".main__right-section");

    filterButton.addEventListener("click", () => {
        filterButton.classList.toggle("filter-toggle--highlighted");
        moreFiltersSection.classList.toggle("more-filters--hidden");
        mainRightSection.classList.toggle("main__right-section--shifted");
    })
}