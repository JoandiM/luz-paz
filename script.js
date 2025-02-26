

document.addEventListener("DOMContentLoaded", function () {
    let preloader = document.getElementById("preloader");
    let contenido = document.getElementById("contenido");

    window.onload = function () {
        preloader.classList.add("hidden");

        setTimeout(() => {
            preloader.style.display = "none";
            contenido.style.display = "block";

            // 🔹 Inicializar AOS después de que desaparezca el preloader
            AOS.init({
                duration: 1000,
                easing: "ease-in-out",
                once: true
            });

            // 🔄 Asegurar que las animaciones se carguen bien
            setTimeout(() => {
                AOS.refresh();
            }, 300);

            // 💡 Inicializar el modal dinámico de pastores
            inicializarModalPastores();
        }, 500);
    };

    const pastorModalImg = document.getElementById("pastorModalImg");

    if (pastorModalImg) {
        pastorModalImg.onload = function () {
            this.classList.add("loaded");
        };
    }

    // 🚀 Función para manejar la apertura del modal dinámico de pastores
    function inicializarModalPastores() {
        const pastorCards = document.querySelectorAll(".pastor-card");

        pastorCards.forEach(card => {
            card.addEventListener("click", function () {
                const name = this.getAttribute("data-name");
                const img = this.getAttribute("data-img");
                const info = this.getAttribute("data-info");

                document.getElementById("pastorModalLabel").textContent = name;
                document.getElementById("pastorModalImg").src = img;
                document.getElementById("pastorModalImg").alt = name;
                document.getElementById("pastorModalInfo").textContent = info;

                let modal = new bootstrap.Modal(document.getElementById("pastorModal"));
                modal.show();
            });
        });
    }

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;
    const logo = document.getElementById("logo"); // Asegúrate de que el logo tiene este ID
    const logotoggler = document.getElementById("logotoggler");
    const spinner = document.getElementById("spiner");

    // Cargar el tema guardado en LocalStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeIcon.classList.replace("fa-moon", "fa-sun"); // Ícono de sol
        logo.src = "images/LogoPositivo.svg"; // Cambia al logo oscuro
        logotoggler.src = "images/LogoPositivo.svg"; // Cambia al logo toggler oscuro
        spinner.src = "images/LogoPositivo.svg";
    } else {
        localStorage.setItem("theme", "light");
        themeIcon.classList.replace("fa-sun", "fa-moon");
        logo.src = "images/LogoNegativo.svg"; // Cambia al logo claro
        logotoggler.src = "images/LogoNegativo.svg"; // Cambia al logo toggler claro
        spinner.src = "images/LogoNegativo.svg";
    }

    // Evento para cambiar el tema
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Guardar la preferencia en LocalStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeIcon.classList.replace("fa-moon", "fa-sun");
            logo.src = "images/LogoPositivo.svg"; // Cambia al logo oscuro
            logotoggler.src = "images/LogoPositivo.svg"; // Cambia al logo toggler oscuro
            spinner.src = "images/LogoPositivo.svg";
        } else {
            localStorage.setItem("theme", "light");
            themeIcon.classList.replace("fa-sun", "fa-moon");
            logo.src = "images/LogoNegativo.svg"; // Cambia al logo claro
            logotoggler.src = "images/LogoNegativo.svg"; // Cambia al logo toggler claro
            spinner.src = "images/LogoNegativo.svg";
        }
    });

    

    const sedes = [
        {
            "id": 1,
            "tipo": 1, // 1 = Nacional, 2 = Internacional
            "nombre": "Juan José Mora",
            "imagen": "images/juan jose mora.jpg",
            "ubicacion": "https://maps.app.goo.gl/iMDL1kU8o9WVcxiH8",
            "horarios": ["Lunes 9AM-5PM", "Martes 9AM-5PM"],
            "pastores": [
                {"nombre": "Jesus Jimenez", "src": "images/pastor.jpeg"},
                {"nombre": "Maritha de Jimenez 2", "src": "images/pastora.jpeg"}
            ],
            "actividades": [
                {"nombre": "Ayuno", "src": "images/pastora.jpeg"},
                {"nombre": "Vigilia", "src": "images/pastora.jpeg"}
            ]
        },
        {
            "id": 2,
            "tipo": 2, // Internacional
            "nombre": "Sede Internacional 1",
            "imagen": "images/colombia.png",
            "ubicacion": "Dirección Internacional",
            "horarios": ["Miércoles 9AM-5PM", "Jueves 9AM-5PM"],
            "pastores": [
                {"nombre": "Pastor 3", "src": "images/pastor3.jpg"},
                {"nombre": "Pastor 4", "src": "images/pastor4.jpg"}
            ],
            "actividades": [
                {"nombre": "Actividad 3", "src": "images/actividad3.jpg"},
                {"nombre": "Actividad 4", "src": "images/actividad4.jpg"}
            ]
        },
        // Más sedes...
    ];

    const sedesContainer = document.getElementById('sedesContainer');
    const searchInput = document.getElementById('searchInput');
    const filterType = document.getElementById('filterType');
    const searchResults = document.getElementById('searchResults');
    const pagination = document.getElementById('pagination');
    const totalSedes = document.getElementById('totalSedes');
    const nacionales = document.getElementById('nacionales');
    const internacionales = document.getElementById('internacionales');

    let currentPage = 1;
    const itemsPerPage = 9;

    // Actualizar estadísticas
    function updateStats() {
        const total = sedes.length;
        const nacional = sedes.filter(sede => sede.tipo === 1).length;
        const internacional = sedes.filter(sede => sede.tipo === 2).length;

        totalSedes.textContent = total;
        nacionales.textContent = nacional;
        internacionales.textContent = internacional;
    }

    // Filtrar sedes por tipo y término de búsqueda
    function filterSedes() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterType.value;

        let filteredSedes = sedes.filter(sede => {
            const matchesSearch = sede.nombre.toLowerCase().includes(searchTerm);
            const matchesFilter = filterValue === "all" || 
                                 (filterValue === "nacional" && sede.tipo === 1) || 
                                 (filterValue === "internacional" && sede.tipo === 2);
            return matchesSearch && matchesFilter;
        });

        return filteredSedes;
    }

    // Mostrar sedes
    function showSedes(page = 1) {
        const filteredSedes = filterSedes();
        sedesContainer.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedSedes = filteredSedes.slice(start, end);

        if (filteredSedes.length === 0) {
            searchResults.innerHTML = '<p class="text-danger">No se encontraron resultados.</p>';
        } else {
            searchResults.innerHTML = '';
        }

        paginatedSedes.forEach(sede => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="sede-card" data-id="${sede.id}" data-aos="fade-up">
                    <img src="${sede.imagen}" alt="${sede.nombre}">
                    <div class="card-body">
                        <h3>${sede.nombre}</h3>
                        <p><strong>Horarios:</strong> ${sede.horarios.join(', ')}</p>
                        <p><strong>Ver mas:</strong></p>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => openSedeModal(sede));
            sedesContainer.appendChild(card);
        });

        updatePagination(filteredSedes.length, page);
    }

    // Actualizar paginación
    function updatePagination(totalItems, currentPage) {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                showSedes(i);
            });
            pagination.appendChild(li);
        }
    }

    // Abrir modal de sede
    function openSedeModal(sede) {
        document.getElementById('modalSedeNombre').innerText = sede.nombre;
        document.getElementById('modalSedeDireccion').innerText = sede.ubicacion;
        document.getElementById('modalSedeDireccion').href = sede.ubicacion;

        const pastoresDiv = document.getElementById('modalPastores');
        pastoresDiv.innerHTML = '';
        sede.pastores.forEach(pastor => {
            const card = document.createElement('div');
            card.className = 'col-md-6 d-flex flex-column align-items-center text-center p-2';
            card.innerHTML = `
                <p class="fw-bold">${pastor.nombre}</p>
                <img src="${pastor.src}" alt="${pastor.nombre}" class="img-fluid rounded">
            `;
            pastoresDiv.appendChild(card);
        });

        const horariosUl = document.getElementById('modalHorarios');
        horariosUl.innerHTML = '';
        sede.horarios.forEach(horario => {
            const li = document.createElement('div');
            li.className = "card p-2 m-2 col-6 mx-auto";
            li.innerHTML = `<p class="fw-bold">${horario}</p>`;
            horariosUl.appendChild(li);
        });

        const actividadesDiv = document.getElementById('modalActividades');
        actividadesDiv.innerHTML = '<div class="row g-3">';
        sede.actividades.forEach(actividad => {
            const card = document.createElement('div');
            card.className = 'col-md-4 d-flex flex-column align-items-center text-center p-2';
            card.innerHTML = `
                <img src="${actividad.src}" alt="${actividad.nombre}" class="img-fluid rounded">
                <p>${actividad.nombre}</p>
            `;
            actividadesDiv.appendChild(card);
        });
        actividadesDiv.innerHTML += '</div>';

        $('#sedeModal').modal('show');
    }

    // Eventos para filtros y búsqueda
    filterType.addEventListener('change', () => {
        showSedes();
    });

    searchInput.addEventListener('input', () => {
        showSedes();
    });

    // Inicializar
    updateStats();
    showSedes();



    const toggleRadio = document.getElementById("toggleRadio");
    const closeRadio = document.getElementById("closeRadio");
    const radioPlayer = document.getElementById("radioPlayer");

    // Mostrar/ocultar el reproductor de radio
    toggleRadio.addEventListener("click", function () {
        radioPlayer.classList.toggle("show-player");
    });

    // Cerrar el reproductor de radio
    closeRadio.addEventListener("click", function () {
        radioPlayer.classList.remove("show-player");
    });
    
});