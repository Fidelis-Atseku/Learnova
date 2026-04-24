export function init(){
    try {
        const home = document.querySelector(".home");
        const featuredCoursesSection = home.querySelector(".home__section--featured-courses");
        const areaButtons = featuredCoursesSection.querySelectorAll(".area__button");
        const areaDisplay = featuredCoursesSection.querySelector(".area-display");
        const areaName = featuredCoursesSection.querySelector(".area-name");
        areaButtons.forEach(button => {
            button.addEventListener("click", () => {
                // highlight
                areaButtons.forEach(btn => {
                    btn.classList.toggle("area__button--selected", btn === button);
                })

                if (button === featuredCoursesSection.querySelector(".area__button--clear")){
                    areaDisplay.style.display = "none";
                }
                else {
                    areaDisplay.style.display = "inline";
                    areaName.textContent = button.textContent;
                }

            })
        })
    } catch(error){

    };
}