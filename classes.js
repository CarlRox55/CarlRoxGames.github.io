class HeaderBar {
    constructor({ title, links = [] }) {
        this.title = title;
        this.links = links;
    }

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const nav = this.links
            .map(link => `<a href="${link.href}">${link.label}</a>`)
            .join("");

        container.innerHTML = `
            <header class="header-bar">
                <a class="logo" href="#">${this.title}</a>
                <nav>${nav}</nav>
            </header>
        `;
    }
}