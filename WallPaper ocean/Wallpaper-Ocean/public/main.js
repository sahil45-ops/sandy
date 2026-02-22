// Search function to navigate based on input term
function search() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

    if (searchTerm === "") {
        alert("Please enter a search term.");
    } else {
        const pages = {
            "animals": "animals.html",
            "cars": "cars.html",
            "art": "art.html",
            "nature": "nature.html"
        };

        if (pages[searchTerm]) {
            window.location.href = pages[searchTerm];
        } else {
            alert(`No results found for: ${searchTerm}`);
        }
    }
}

// Redirect to a specific URL
function redirectTo(url) {
    window.location.href = url;
}

// Initialize event listeners for different page elements
function initializeEventListeners() {
    console.log("Page has loaded, JavaScript is ready!");

    // Search button functionality
    const searchButton = document.getElementById('searchBtn');
    if (searchButton) {
        searchButton.addEventListener("click", search);
    }

    // Navigation buttons functionality
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetUrl = this.getAttribute("data-url");
            if (targetUrl) {
                redirectTo(targetUrl);
            }
        });
    });

    // Show Welcome alert only if the current page is NOT 'animals.html', 'art.html', 'cars.html', or 'nature.html'
    const currentPage = window.location.pathname.split('/').pop();
    const excludedPages = ['animals.html', 'art.html', 'cars.html', 'nature.html','favorites.html'];

    if (!excludedPages.includes(currentPage)) { 
        alert("Welcome to Wallpaper Ocean!");
    }
}

// Initialize event listeners when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", initializeEventListeners);

// Function to open the lightbox with the image and text
function openLightbox(imageSrc, imageText) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxText = document.getElementById('lightbox-text');
    const downloadBtn = document.getElementById('download-btn');
    
    // Set the image source and text in the lightbox
    lightboxImg.src = imageSrc;
    lightboxText.textContent = imageText;
    
    // Set download button link and filename
    downloadBtn.href = imageSrc;
    downloadBtn.download = imageSrc.split('/').pop();

    lightbox.style.display = 'flex'; // Display the lightbox
}

// Function to close the lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Function to remove the wallpaper from download list
function removeFromDownload() {
    alert('Wallpaper removed from download list!');
    
    
}

// Placeholder functions for favorite and cart actions
function addToFavorites() {
    alert('Added to Favorites!');
}

function saveToCart() {
    alert('Saved to Cart!');
}

// Attach click events to each wallpaper image to open the lightbox
document.querySelectorAll('.wallpaper-item img').forEach(img => {
    img.addEventListener('click', function () {
        const src = this.src;
        const text = this.nextElementSibling?.textContent || "No description available";
        openLightbox(src, text);
    });
});

// Close the lightbox when clicking outside the image content
const lightbox = document.getElementById('lightbox');
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close the lightbox using the close button
document.querySelector('.close-btn').addEventListener('click', closeLightbox);


// Sample data for favorites
const favorites = {
    animals: [
        { src: "IMG-20240930-WA0011.jpg", name: "Animal 1" },
        { src: "IMG-20240930-WA0010.jpg", name: "Animal 2" }
    ],
    cars: [
        { src: "IMG-20240930-WA0004.jpg", name: "Car 1" },
        { src: "wallpaper-car-wallpapers-v0-k5y4ka5av7qd1.webp", name: "Car 2" }
    ],
    art: [
        { src: "WhatsApp Image 2024-09-30 at 20.24.25_96f354bb.jpg", name: "Art 1" },
        { src: "download.jpg", name: "Art 2" }
    ],
    nature: [
        { src: "download (1).jpg", name: "Nature 1" },
        { src: "WhatsApp Image 2024-09-30 at 20.27.38_dc7a9917.jpg", name: "Nature 2" }
    ]
};

// Function to populate the favorites grid based on selected category
function updateFavorites(category = 'all') {
    const grid = document.getElementById('favoritesGrid');
    grid.innerHTML = ''; // Clear current grid

    let imagesToShow = [];

    if (category === 'all') {
        // Show all categories
        imagesToShow = [].concat(...Object.values(favorites));
    } else if (favorites[category]) {
        // Show only selected category
        imagesToShow = favorites[category];
    }

    // Create and display wallpaper items
    imagesToShow.forEach(favorite => {
        const wallpaperItem = document.createElement('div');
        wallpaperItem.classList.add('wallpaper-item');
        wallpaperItem.innerHTML = `
            <img src="${favorite.src}" alt="${favorite.name}" class="wallpaper-image">
            <p class="wallpaper-name">${favorite.name}</p>
            <button class="remove-from-favorites-btn" onclick="removeFromFavorites('${favorite.src}')">Remove from favorites</button>
        `;
        grid.appendChild(wallpaperItem);
    });
}

// Function to handle removal of wallpaper from favorites
function removeFromFavorites(src) {
    // Loop through each category and remove the item with the matching `src`
    for (let category in favorites) {
        favorites[category] = favorites[category].filter(fav => fav.src !== src);
    }

    // Re-update the grid after removal
    const selectedCategory = document.getElementById('categorySelect').value;
    updateFavorites(selectedCategory);

    // Show an alert to confirm removal
    alert('Wallpaper removed from your Favorites list!');
}

// Initialize the page with the 'all' category
updateFavorites('all');

// Event listener for category selection
document.getElementById('categorySelect').addEventListener('change', (event) => {
    updateFavorites(event.target.value);
});

// Functionality for the search bar
document.getElementById('searchBtn').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    searchFavorites(searchTerm);
});

// Function to filter wallpapers based on the search term
function searchFavorites(searchTerm) {
    const grid = document.getElementById('favoritesGrid');
    grid.innerHTML = ''; // Clear current grid

    let filteredImages = [];

    // Filter through all categories
    for (let category in favorites) {
        const filtered = favorites[category].filter(fav =>
            fav.name.toLowerCase().includes(searchTerm)
        );
        filteredImages = filteredImages.concat(filtered);
    }

    // Create and display filtered wallpaper items
    filteredImages.forEach(favorite => {
        const wallpaperItem = document.createElement('div');
        wallpaperItem.classList.add('wallpaper-item');
        wallpaperItem.innerHTML = `
            <img src="${favorite.src}" alt="${favorite.name}" class="wallpaper-image">
            <p class="wallpaper-name">${favorite.name}</p>
            <button class="remove-from-favorites-btn" onclick="removeFromFavorites('${favorite.src}')">Remove from favorites</button>
        `;
        grid.appendChild(wallpaperItem);
    });
}

// Sample data for saved wallpapers
const savedWallpapers = [
    { src: "IMG-20240930-WA0011.jpg", name: "Saved Wallpaper 1" },
    { src: "IMG-20240930-WA0010.jpg", name: "Saved Wallpaper 2" },
    { src: "IMG-20240930-WA0004.jpg", name: "Saved Wallpaper 3" },
    { src: "wallpaper-car-wallpapers-v0-k5y4ka5av7qd1.webp", name: "Saved Wallpaper 4" },
    { src: "WhatsApp Image 2024-09-30 at 20.24.25_96f354bb.jpg", name: "Saved Wallpaper 5" }
];

let lightboxSrc = '';
// Function to populate the saved wallpapers grid
function updateSavedWallpapers() {
    const grid = document.getElementById('savedWallpapersGrid');
    grid.innerHTML = '';

    savedWallpapers.forEach(wallpaper => {
        const wallpaperItem = document.createElement('div');
        wallpaperItem.classList.add('wallpaper-item');
        wallpaperItem.innerHTML = `
            <img src="${wallpaper.src}" alt="${wallpaper.name}" class="wallpaper-image" onclick="openLightbox('${wallpaper.src}', '${wallpaper.name}')">
            <p class="wallpaper-name">${wallpaper.name}</p>
        `;
        grid.appendChild(wallpaperItem);
    });
}
// Function to remove wallpaper from saved list
function removeFromSaved(src) {
    const index = savedWallpapers.findIndex(wallpaper => wallpaper.src === src);
    if (index !== -1) {
        savedWallpapers.splice(index, 1);
        updateSavedWallpapers();
        alert('Wallpaper removed from saved list!');
        closeLightbox();
    }
}

// Initialize the page
updateSavedWallpapers();







