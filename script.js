document.getElementById("scroll-btn").addEventListener("click", function () {
    document.querySelector(".first").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("scroll-btn2").addEventListener("click", function () {
    document.querySelector(".second").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("scroll-btn3").addEventListener("click", function () {
    document.querySelector(".fifth").scrollIntoView({
        behavior: "smooth"
    });
});