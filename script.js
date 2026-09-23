// =========================
// RESERVATION FORM → WHATSAPP
// =========================

const reservationForm = document.getElementById("reservation-form");

if (reservationForm) {

    reservationForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get form values
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = document.getElementById("date").value;
        const guests = document.getElementById("guests").value;
        const message = document.getElementById("message").value.trim();


        // Format reservation date

const dateParts = date.split("-");

const formattedDate =
    dateParts[2] + " " +
    new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
        .toLocaleString("en-IN", { month: "long" }) +
    " " +
    dateParts[0];


const whatsappMessage =
    "Hello The Royal Table!%0A%0A" +

    "*TABLE RESERVATION REQUEST*%0A%0A" +

    "*Name:* " + encodeURIComponent(name) + "%0A" +
    "*Phone:* " + encodeURIComponent(phone) + "%0A" +
    "*Date:* " + encodeURIComponent(formattedDate) + "%0A" +
    "*Guests:* " + encodeURIComponent(guests) + "%0A" +
    "*Special Request:* " +
    encodeURIComponent(message || "None") +
    "%0A%0A" +

    "Please confirm my reservation.%0A%0A" +

    "Thank you!%0A" +
    "The Royal Table";


        // Your WhatsApp number
        const whatsappNumber = "917016848452";


        // Open WhatsApp
        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            whatsappMessage;


        window.open(whatsappURL, "_blank");

        cart = [];
        updateCart();


        // Reset form
        reservationForm.reset();

    });

}


// =========================
// MENU FILTER + ANIMATION
// =========================

const menuFilters = document.querySelectorAll(".menu-filter");
const menuCards = document.querySelectorAll(".menu-card[data-category]");

let activeMenuFilter = "all";

menuFilters.forEach(function (button) {

    button.addEventListener("click", function () {

        activeMenuFilter = button.getAttribute("data-filter");

        menuFilters.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // VIEW ALL CARD
        if (viewAllDishes) {

            if (activeMenuFilter === "all") {
                viewAllDishes.style.display = "flex";
            } else {
                viewAllDishes.style.display = "none";
            }

        }

        // MENU DISHES
        menuCards.forEach(function (card) {

            const category = card.getAttribute("data-category");

            card.classList.remove("filter-show");

            // ALL
            if (activeMenuFilter === "all") {

                if (!card.classList.contains("hidden-dish")) {

                    card.style.display = "block";

                    void card.offsetWidth;

                    card.classList.add("filter-show");

                } else {

                    card.style.display = "none";

                }

            }

            // CATEGORY FILTER
            else if (category === activeMenuFilter) {

                card.style.display = "block";

                void card.offsetWidth;

                card.classList.add("filter-show");

            }

            // NOT MATCHING
            else {

                card.style.display = "none";

            }

        });

    });

});


// =========================
// MOBILE MENU
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("header nav");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {

        navigation.classList.toggle("active");

    });


    const navLinks = navigation.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("active");

        });

    });

}


// =========================
// LIGHT / DARK MODE
// =========================

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {

    const themeIcon = themeToggle.querySelector("i");


    // Load saved theme
    const savedTheme = localStorage.getItem("royalTableTheme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }


    // Toggle theme
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");


        const isLightMode =
            document.body.classList.contains("light-mode");


        if (isLightMode) {

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");

            localStorage.setItem(
                "royalTableTheme",
                "light"
            );

        } else {

            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");

            localStorage.setItem(
                "royalTableTheme",
                "dark"
            );

        }

    });

}


// =========================
// REPEAT SCROLL ANIMATION
// =========================

const animatedElements = document.querySelectorAll(
    "#about, #menu, #gallery, #chef-special, #testimonials, #reservation, #contact"
);

const scrollObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });
    },
    { threshold: 0.15 }
);


animatedElements.forEach(function (element) {

    element.classList.add("scroll-animate");

    scrollObserver.observe(element);

});

// =========================
// MENU IMAGE LIGHTBOX
// =========================

const menuImages = document.querySelectorAll(
    ".menu-card-image img, .gallery-item img"
);

const imageLightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");


menuImages.forEach(function (image) {

    image.addEventListener("click", function () {

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        imageLightbox.classList.add("active");

    });

});


if (lightboxClose) {

    lightboxClose.addEventListener("click", function () {

        imageLightbox.classList.remove("active");

    });

}


// Close when clicking outside the image

if (imageLightbox) {

    imageLightbox.addEventListener("click", function (event) {

        if (event.target === imageLightbox) {

            imageLightbox.classList.remove("active");

        }

    });

}


// Close with ESC key

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        imageLightbox.classList.remove("active");

    }

});


// =========================
// SHOPPING CART - STEP 1
// =========================

let cart = JSON.parse(localStorage.getItem("royalTableCart")) || [];

const addToCartButtons = document.querySelectorAll(".menu-card .add-to-cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

// =========================
// CART TOAST
// =========================

const cartToast = document.getElementById("cart-toast");
const cartToastMessage = document.getElementById("cart-toast-message");

let cartToastTimer;

function showCartToast(message) {

    if (!cartToast || !cartToastMessage) {
        return;
    }

    cartToastMessage.textContent = message;

    cartToast.classList.add("show");

    clearTimeout(cartToastTimer);

    cartToastTimer = setTimeout(function () {
        cartToast.classList.remove("show");
    }, 2500);

}

addToCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.getAttribute("data-name");
        const price = Number(button.getAttribute("data-price"));
        const image = button.closest(".menu-card").querySelector(".menu-card-image img").src;

        const existingItem = cart.find(function (item) {
    return item.name === name;
});

    if (existingItem) {

        existingItem.quantity++;

    } else {
        
        cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1
    });

}

        updateCart();

        showCartToast(name + " added to cart");
        cartPanel.classList.add("active");

    });

});


function updateCart() {

    localStorage.setItem("royalTableCart", JSON.stringify(cart));

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartCount.textContent = "0";
        cartTotal.textContent = "₹0";

        return;
    }

    let total = 0;

    cart.forEach(function (item) {

        total += item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML =
            '<img src="' + item.image + '" alt="' + item.name + '">' +
            '<div>' +
                '<h3>' + item.name + '</h3>' +
                '<p>₹' + item.price + '</p>' +
                '<div class="quantity-controls">' +
                    '<button class="quantity-minus">−</button>' +
                    '<span>' + item.quantity + '</span>' +
                    '<button class="quantity-plus">+</button>' +
                '</div>' +
                '<button class="remove-cart-item">Delete</button>' +
            '</div>';

        cartItems.appendChild(cartItem);

    });

    const discount = total * 0.15;
    const finalTotal = total - discount;

    cartCount.textContent = cart.reduce(function (sum, item) {
        return sum + item.quantity;
    }, 0);

    cartTotal.innerHTML =
    '<div class="cart-price-breakdown">' +
        '<div><span>Subtotal</span><span>₹' + total.toFixed(2) + '</span></div>' +
        '<div><span>15% Discount</span><span>-₹' + discount.toFixed(2) + '</span></div>' +
        '<div class="cart-final-total"><span>Total</span><strong>₹' + finalTotal.toFixed(2) + '</strong></div>' +
    '</div>';
}

updateCart();


// =========================
// QUANTITY CONTROLS
// =========================

document.addEventListener("click", function (event) {

    // PLUS BUTTON
    if (event.target.classList.contains("quantity-plus")) {

        const cartItem = event.target.closest(".cart-item");
        const itemName = cartItem.querySelector("h3").textContent;

        const item = cart.find(function (product) {
            return product.name === itemName;
        });

        if (item) {
            item.quantity++;
            updateCart();
        }
    }


    // MINUS BUTTON
    if (event.target.classList.contains("quantity-minus")) {

        const cartItem = event.target.closest(".cart-item");
        const itemName = cartItem.querySelector("h3").textContent;

        const item = cart.find(function (product) {
            return product.name === itemName;
        });

        if (item && item.quantity > 1) {
            item.quantity--;
            updateCart();
        }
    }

});


// =========================
// DELETE CART ITEM
// =========================

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("remove-cart-item")) {

        const cartItem = event.target.closest(".cart-item");
        const itemName = cartItem.querySelector("h3").textContent;

        cart = cart.filter(function (item) {
            return item.name !== itemName;
        });

        updateCart();
    }

});


// =========================
// CART OPEN / CLOSE
// =========================

const cartToggle = document.getElementById("cart-toggle");
const cartPanel = document.getElementById("cart-panel");
const cartClose = document.getElementById("cart-close");

const orderWhatsapp = document.getElementById("order-whatsapp");

const clearCart = document.getElementById("clear-cart");

if (clearCart) {
    clearCart.addEventListener("click", function () {

        if (cart.length === 0) {
            return;
        }

        cart = [];

        updateCart();

    });
}

if (orderWhatsapp) {

    orderWhatsapp.addEventListener("click", function () {

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        let orderMessage = "Hello The Royal Table!%0A%0A";
        orderMessage += "*NEW FOOD ORDER*%0A%0A";

        let total = 0;

        cart.forEach(function (item, index) {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;

            orderMessage +=
                (index + 1) + ". " +
                encodeURIComponent(item.name) +
                " × " +
                item.quantity +
                " = ₹" +
                itemTotal.toFixed(2) +
                "%0A";
        });

        const discount = total * 0.15;
        const finalTotal = total - discount;

        orderMessage +=
            "%0A*SUBTOTAL: ₹" +
            total.toFixed(2) +
            "*%0A";

        orderMessage +=
            "*15% DISCOUNT: -₹" +
            discount.toFixed(2) +
            "*%0A";

        orderMessage +=
            "*FINAL TOTAL: ₹" +
            finalTotal.toFixed(2) +
            "*%0A%0A";

        orderMessage +=
            "Please confirm my order.%0A%0A" +
            "Thank you!%0A" +
            "The Royal Table";

        const whatsappNumber = "917016848452";

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            orderMessage;

        window.open(whatsappURL, "_blank");

    });

}

if (cartToggle && cartPanel) {

    cartToggle.addEventListener("click", function () {
        cartPanel.classList.add("active");
    });

}

if (cartClose && cartPanel) {

    cartClose.addEventListener("click", function () {
        cartPanel.classList.remove("active");
    });

}


// =========================
// DISH DETAILS POPUP
// =========================

const dishModal = document.getElementById("dish-modal");
const dishModalClose = document.getElementById("dish-modal-close");

const dishModalImage = document.getElementById("dish-modal-image");
const dishModalName = document.getElementById("dish-modal-name");
const dishModalDescription = document.getElementById("dish-modal-description");
const dishModalPrice = document.getElementById("dish-modal-price");

const dishMenuCards = document.querySelectorAll(".menu-card");

menuCards.forEach(function (card) {

    card.addEventListener("click", function (event) {

        // Add to Cart button par click hone par popup mat kholo
        if (event.target.closest(".add-to-cart")) {
            return;
        }

        const image = card.querySelector(".menu-card-image img");
        const name = card.querySelector(".menu-title h3");
        const price = card.querySelector(".menu-title strong");
        const description = card.querySelector(".menu-card-content > p");

        dishModalImage.src = image.src;
        dishModalImage.alt = image.alt;

        dishModalName.textContent = name.textContent;
        dishModalDescription.textContent = description.textContent;
        dishModalPrice.textContent = price.textContent;

        dishModal.classList.add("active");
    });

});


// Popup CLOSE button
dishModalClose.addEventListener("click", function () {
    dishModal.classList.remove("active");
});


// Popup ke bahar click karne par close
dishModal.addEventListener("click", function (event) {

    if (event.target === dishModal) {
        dishModal.classList.remove("active");
    }

});


// =========================
// POPUP ADD TO CART
// =========================

const dishModalCart = document.getElementById("dish-modal-cart");

if (dishModalCart) {

    dishModalCart.addEventListener("click", function () {

        const name = dishModalName.textContent;
        const price = Number(
            dishModalPrice.textContent.replace(/[^\d]/g, "")
        );
        const image = dishModalImage.src;

        const existingItem = cart.find(function (item) {
            return item.name === name;
        });

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });

        }

        updateCart();

        cartPanel.classList.add("active");

        dishModal.classList.remove("active");

    });

}


// =========================
// MENU SEARCH
// =========================

const menuSearch = document.getElementById("menu-search");
const noDishesMessage = document.getElementById("no-dishes-message");
const searchViewAll = document.getElementById("view-all-dishes");

if (menuSearch) {

    menuSearch.addEventListener("input", function () {

        const searchText = menuSearch.value.toLowerCase().trim();
        let foundDishes = 0;

        menuCards.forEach(function (card) {

            const category = card.getAttribute("data-category");

            const dishName =
                card.querySelector(".menu-title h3").textContent.toLowerCase();

            const dishDescription =
                card.querySelector(".menu-card-content > p").textContent.toLowerCase();

            const categoryMatches =
                activeMenuFilter === "all" ||
                category === activeMenuFilter;

            const searchMatches =
                dishName.includes(searchText) ||
                dishDescription.includes(searchText);

            if (categoryMatches && searchMatches) {

                card.style.display = "block";

                card.classList.remove("filter-show");

                void card.offsetWidth;

                card.classList.add("filter-show");

                foundDishes++;

            } else {

                card.style.display = "none";

            }

        });

        // SEARCH RESULT MILA
        if (foundDishes > 0) {

            noDishesMessage.style.display = "none";

            if (searchViewAll && activeMenuFilter === "all") {
                searchViewAll.style.display = "flex";
            } else if (searchViewAll) {
                searchViewAll.style.display = "none";
            }

        }

        // KOI RESULT NAHI
        else {

            noDishesMessage.style.display = "block";

            if (searchViewAll) {
                searchViewAll.style.display = "none";
            }

        }

    });

}


// =========================
// BACK TO TOP
// =========================

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =========================
// RESTAURANT OPEN / CLOSED STATUS
// =========================

const statusText = document.getElementById("restaurant-status-text");
const statusDot = document.querySelector(".status-dot");

function updateRestaurantStatus() {

    const now = new Date();

    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const currentTime = currentHour * 60 + currentMinutes;

    const openingTime = 11 * 60;       // 11:00 AM
    const closingTime = 23 * 60;       // 11:00 PM

    if (currentTime >= openingTime && currentTime < closingTime) {

        statusText.textContent = "OPEN NOW";
        statusDot.style.background = "#3fb950";
        statusDot.style.boxShadow = "0 0 10px rgba(63, 185, 80, 0.7)";

    } else {

        statusText.textContent = "CLOSED NOW";
        statusDot.style.background = "#d9534f";
        statusDot.style.boxShadow = "0 0 10px rgba(217, 83, 79, 0.7)";

    }

}

if (statusText && statusDot) {

    updateRestaurantStatus();

    setInterval(updateRestaurantStatus, 60000);

}


// =========================
// VIEW ALL DISHES
// =========================

const viewAllDishes = document.getElementById("view-all-dishes");

if (viewAllDishes) {

    viewAllDishes.addEventListener("click", function () {

        const hiddenDishes = document.querySelectorAll(
            ".menu-card.hidden-dish"
        );

        hiddenDishes.forEach(function (dish) {

            dish.classList.remove("hidden-dish");

            dish.style.display = "block";
            dish.style.opacity = "1";
            dish.style.visibility = "visible";
            dish.style.transform = "translateY(0)";

        });

        viewAllDishes.style.display = "none";

    });

}


// =========================
// PREMIUM PAGE LOADER
// =========================

window.addEventListener("load", function () {

    const pageLoader = document.getElementById("page-loader");

    if (pageLoader) {

        setTimeout(function () {

            pageLoader.classList.add("loader-hidden");

        }, 1800);

    }

});