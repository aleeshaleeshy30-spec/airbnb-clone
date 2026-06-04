const properties = [
    {
        id: 1,
        title: "Cozy Mountain Cabin",
        location: "Aspen, Colorado",
        price: 180,
        rating: 4.9,
        image: "https://picsum.photos/id/1015/600/400",
        type: "Entire cabin"
    },
    {
        id: 2,
        title: "Oceanfront Villa",
        location: "Malibu, California",
        price: 450,
        rating: 4.8,
        image: "https://picsum.photos/id/201/600/400",
        type: "Entire villa"
    },
    {
        id: 3,
        title: "Modern Downtown Loft",
        location: "New York, NY",
        price: 220,
        rating: 4.7,
        image: "https://picsum.photos/id/870/600/400",
        type: "Entire loft"
    },
    {
        id: 4,
        title: "Luxury Treehouse",
        location: "Sedona, Arizona",
        price: 295,
        rating: 4.9,
        image: "https://picsum.photos/id/315/600/400",
        type: "Treehouse"
    }
];

function renderProperties() {
    const grid = document.getElementById('property-grid');
    grid.innerHTML = '';

    properties.forEach(property => {
        const card = `
            <div class="property-card bg-white rounded-3xl overflow-hidden cursor-pointer" onclick="bookProperty(${property.id})">
                <div class="relative">
                    <img src="${property.image}" class="w-full h-64 object-cover">
                    <button onclick="event.stopImmediatePropagation(); toggleWishlist(this)" 
                            class="absolute top-4 right-4 text-white text-2xl">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="p-5">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-sm text-gray-500">${property.location}</p>
                            <h3 class="font-semibold text-lg leading-tight mt-1">${property.title}</h3>
                        </div>
                        <div class="text-right">
                            <span class="font-bold">$${property.price}</span>
                            <span class="text-xs text-gray-500">night</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-1 mt-3">
                        <span class="text-yellow-500">★</span>
                        <span class="font-medium">${property.rating}</span>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">${property.type}</p>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

let selectedProperty = null;

function bookProperty(id) {
    selectedProperty = properties.find(p => p.id === id);
    if (!selectedProperty) return;

    document.getElementById('modal-title').textContent = selectedProperty.title;
    document.getElementById('modal-image').innerHTML = `
        <img src="${selectedProperty.image}" class="w-full h-full object-cover">
    `;
    document.getElementById('modal-price').textContent = `$${selectedProperty.price}/night`;

    const checkin = document.getElementById('checkin').value || "2026-06-15";
    const checkout = document.getElementById('checkout').value || "2026-06-20";
    
    document.getElementById('modal-checkin').textContent = checkin;
    document.getElementById('modal-checkout').textContent = checkout;

    const nights = 5;
    document.getElementById('modal-total').textContent = `$${(selectedProperty.price * nights)}`;

    document.getElementById('booking-modal').classList.remove('hidden');
    document.getElementById('booking-modal').classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('booking-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function confirmBooking() {
    alert(`🎉 Reservation Confirmed!\n\n${selectedProperty.title}\nThank you for booking with Airbnb`);
    closeModal();
}

function searchProperties() {
    const location = document.getElementById('location').value.trim();
    if (location) {
        alert(`🔍 Searching stays in: ${location}\n\nShowing available properties...`);
    }
    renderProperties();
}

function toggleWishlist(btn) {
    event.stopImmediatePropagation();
    const icon = btn.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas', 'text-red-500');
    } else {
        icon.classList.remove('fas', 'text-red-500');
        icon.classList.add('far');
    }
}

function toggleLogin() {
    alert("Sign in / Become a Host feature coming soon! (Demo)");
}

// Initialize
window.onload = () => {
    renderProperties();
    
    // Default dates
    const today = new Date();
    const checkin = new Date(today);
    checkin.setDate(today.getDate() + 5);
    
    const checkout = new Date(checkin);
    checkout.setDate(checkin.getDate() + 4);
    
    document.getElementById('checkin').value = checkin.toISOString().split('T')[0];
    document.getElementById('checkout').value = checkout.toISOString().split('T')[0];
};