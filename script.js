document.addEventListener("DOMContentLoaded", function () {
    let preloader = document.getElementById("preloader");
    let contenido = document.getElementById("contenido");

    window.onload = function () {
        preloader.classList.add("hidden");

        setTimeout(() => {
            preloader.style.display = "none";
            contenido.style.display = "block";

            // 💡 Ahora inicializamos AOS después de que el preloader desaparezca
            AOS.init({
                duration: 1000,
                easing: "ease-in-out",
                once: true
            });

            // 🔄 Forzar la actualización por si alguna animación no carga bien
            setTimeout(() => {
                AOS.refresh();
            }, 300);
        }, 500);
    };
});
