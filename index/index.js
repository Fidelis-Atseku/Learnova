const sidebars = document.querySelectorAll(".sidebar");
const footer = document.querySelector('.main-footer');
const footerHeight = footer.getBoundingClientRect().height;

const originalSidebarHeights = new Map();

sidebars.forEach(sidebar => {
    originalSidebarHeights.set(sidebar, sidebar.getBoundingClientRect().height);
});

window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    sidebars.forEach(sidebar => {
        const originalHeight = originalSidebarHeights.get(sidebar);
        
        if (scrollHeight - scrollPosition <= footerHeight + 20) {
            sidebar.style.height = `${originalHeight - ((footerHeight + 10) - (scrollHeight - scrollPosition))}px`;
        } else {
            sidebar.style.height = `${originalHeight}px`;
        }
    });
});