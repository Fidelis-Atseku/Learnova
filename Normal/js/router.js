// sidebarButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         const route = button.dataset.route;
//         navigate(route);
//     })
// })

async function navigate(route) {
  try {
    const response = await fetch(`pages/${route}.html`);

    if (!response.ok) {
      throw new Error("Page not found");
    }

    const html = await response.text();
    appContent.innerHTML = html;

    // Add event listeners to route links in the loaded page
    const routeLinks = document.querySelectorAll("[data-route]");
    routeLinks.forEach(link => {
        link.addEventListener("click", () => {
            const route = link.dataset.route;
            navigate(route);

            // let pageTitle = route;
            // pageTitle = pageTitle.replace("-", " ").toUpperCase();
            // appHeaderTitle.textContent = pageTitle;

            // const pageButton = `sidebar__button--${route}`;
            // sidebarButtons.forEach(Btn => {
            //     Btn.classList.toggle("sidebar__button--selected", Btn.classList.contains(pageButton));
            // });
        })
    })

  } catch (error) {
    appContent.innerHTML = "<h1>Page not found</h1>";
    console.error(error);
  }
}

navigate("dashboard");