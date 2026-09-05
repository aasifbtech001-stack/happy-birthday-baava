document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PARTICLES
    ========================= */

    const particlesContainer =
        document.getElementById("particles");

    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            (Math.random() * 12 + 8) + "s";

        particle.style.animationDelay =
            (Math.random() * 10) + "s";

        const size =
            Math.random() * 3 + 2;

        particle.style.width = size + "px";

        particle.style.height = size + "px";

        particlesContainer.appendChild(particle);
    }


    /* =========================
       IMAGE LIGHTBOX
    ========================= */

    const cards =
        document.querySelectorAll(".memory-card");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const closeBtn =
        document.getElementById("closeBtn");

    const prevBtn =
        document.getElementById("prevBtn");

    const nextBtn =
        document.getElementById("nextBtn");


    let currentIndex = 0;


    /*
     * Get the actual image filenames
     * directly from the HTML.
     *
     * This means the JPG names are never
     * changed by JavaScript.
     */

    const images = Array.from(cards).map(card => {

        return card.querySelector("img").getAttribute("src");

    });


    /* Open image */

    function openLightbox(index) {

        currentIndex = index;

        lightboxImage.src =
            images[currentIndex];

        lightboxImage.alt =
            cards[currentIndex]
                .querySelector("img")
                .alt;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    /* Close */

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

        setTimeout(() => {

            lightboxImage.src = "";

        }, 300);
    }


    /* Next */

    function nextImage() {

        currentIndex++;

        if (currentIndex >= images.length) {

            currentIndex = 0;
        }

        lightboxImage.src =
            images[currentIndex];

        lightboxImage.alt =
            cards[currentIndex]
                .querySelector("img")
                .alt;
    }


    /* Previous */

    function previousImage() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex = images.length - 1;
        }

        lightboxImage.src =
            images[currentIndex];

        lightboxImage.alt =
            cards[currentIndex]
                .querySelector("img")
                .alt;
    }


    /* Card click */

    cards.forEach((card, index) => {

        card.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    /* Button events */

    closeBtn.addEventListener(
        "click",
        closeLightbox
    );

    nextBtn.addEventListener(
        "click",
        nextImage
    );

    prevBtn.addEventListener(
        "click",
        previousImage
    );


    /* Click outside image */

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    /* Keyboard controls */

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("active")) {

            return;
        }

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowRight") {

            nextImage();

        }

        if (event.key === "ArrowLeft") {

            previousImage();

        }

    });


    /* =========================
       IMAGE ERROR HANDLING
    ========================= */

    document
        .querySelectorAll(".memory-card img")
        .forEach(img => {

            img.addEventListener("error", () => {

                console.error(
                    "Could not load image:",
                    img.src
                );

            });

        });

});
