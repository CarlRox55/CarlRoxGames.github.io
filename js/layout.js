function renderLayout(title, content) {
    fetch("layout.html")
        .then(res => res.text())
        .then(headerHtml => {
            document.getElementById("header").innerHTML = headerHtml;
        });

    document.title = title;
    document.getElementById("content").innerHTML = content;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/styles.css";
    document.head.appendChild(link);
}