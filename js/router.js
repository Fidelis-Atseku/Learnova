import { appContent } from "./main.js";
import { appHeaderTitle } from "./main.js";
import { updateSidebarHeight } from "./main.js";
import { highlightSidebarButton } from "./main.js";

const scrollPositions = {};
let currentRoute = null;

window.addEventListener("scroll", () => {
    if (currentRoute){
        scrollPositions[currentRoute] = window.scrollY;
    }
})

export async function navigate(page, route) {
  try {

    if (currentRoute){
        scrollPositions[currentRoute] = window.scrollY;
    }

    // fetch html
    const response = await fetch(`${page}/views/${route}.html`);

    if (!response.ok) {``
      throw new Error("Page not found");
    }

    // update current route
    currentRoute = route;

    const html = await response.text();
    appContent.innerHTML = html;

    // Update app header
    let pageTitle = route.replace("-", " ").toUpperCase();
    appHeaderTitle.textContent = pageTitle;

    // update sidebar
    updateSidebarHeight();

    const pageButton = document.querySelector(`.sidebar__button--${route}`);
    highlightSidebarButton(pageButton);


    // load JS
    const module = await import(`../${page}/js/${route}.js`);
    module.init?.();
    
    // Restore scroll position
    const savedScroll = scrollPositions[route] || 0;

    // Wait a frame to ensure DOM is rendered
    requestAnimationFrame(() => {
        window.scrollTo(0, savedScroll);
    })

    } catch (error) {
        appContent.innerHTML = "<h1>Page not found</h1>";
        console.error(error);
    }
}

