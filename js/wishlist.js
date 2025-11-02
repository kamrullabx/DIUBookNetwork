// Cart functions
function getCartItems() {
	try {
		return JSON.parse(localStorage.getItem('cartItems') || '[]');
	} catch {
		return [];
	}
}

function setCartItems(items) {
	localStorage.setItem('cartItems', JSON.stringify(items));
}

function getCartCount() {
	return getCartItems().reduce((sum, it) => sum + (it.quantity || 1), 0);
}

function updateCartCountUI() {
	const countEl = document.querySelector('.cart-count');
	if (countEl) {
		const n = getCartCount();
		countEl.innerText = n;
		countEl.setAttribute('aria-label', `${n} items in cart`);
	}
}

function addToCart(book) {
	const items = getCartItems();
	const idx = items.findIndex(it => it.title === book.title);
	if (idx >= 0) {
		items[idx].quantity = (items[idx].quantity || 1) + 1;
	} else {
		items.push({
			title: book.title,
			price: book.price || book.currentPrice || 0,
			image: book.image,
			quantity: 1
		});
	}
	setCartItems(items);
	updateCartCountUI();
}

// Wishlist functions
function getWishlistItems() {
	try {
		return JSON.parse(localStorage.getItem('wishlistItems') || '[]');
	} catch {
		return [];
	}
}

function setWishlistItems(items) {
	localStorage.setItem('wishlistItems', JSON.stringify(items));
	updateWishlistCountUI();
}

function removeFromWishlist(bookTitle) {
	const wishlist = getWishlistItems();
	const filtered = wishlist.filter(item => item.title !== bookTitle);
	setWishlistItems(filtered);
}

function getWishlistCount() {
	return getWishlistItems().length;
}

function updateWishlistCountUI() {
	const countEl = document.querySelector('.wishlist-count');
	if (countEl) {
		const count = getWishlistCount();
		countEl.innerText = count;
		countEl.setAttribute('aria-label', `${count} items in wishlist`);
		if (count === 0) {
			countEl.style.display = 'none';
		} else {
			countEl.style.display = 'flex';
		}
	}
}

// Format price
function formatPrice(price) {
	if (typeof price === 'string') {
		const num = parseFloat(price.replace(/[^0-9.]/g, ''));
		return isNaN(num) ? 0 : num;
	}
	return price || 0;
}

// Render wishlist items
function renderWishlist() {
	const wishlistItems = getWishlistItems();
	const wishlistEl = document.getElementById('wishlist-items');
	const emptyEl = document.getElementById('empty-wishlist');

	if (!wishlistEl || !emptyEl) return;

	if (wishlistItems.length === 0) {
		wishlistEl.style.display = 'none';
		emptyEl.style.display = 'block';
		return;
	}

	wishlistEl.style.display = 'block';
	emptyEl.style.display = 'none';

	wishlistEl.innerHTML = '';

	wishlistItems.forEach((item, index) => {
		const price = formatPrice(item.price || item.currentPrice || 0);
		const bookCard = document.createElement('div');
		bookCard.className = 'cart-item';
		bookCard.style.display = 'grid';
		bookCard.style.gridTemplateColumns = '150px 1fr auto auto';
		bookCard.style.gap = '2rem';
		bookCard.style.alignItems = 'center';
		bookCard.style.background = 'white';
		bookCard.style.padding = '2rem';
		bookCard.style.borderRadius = '1rem';
		bookCard.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
		bookCard.style.marginBottom = '2rem';

		bookCard.innerHTML = `
			<div class="cart-item-image" style="width: 120px; height: 150px; overflow: hidden; border-radius: 0.5rem; background: #f5f5f5;">
				<img src="${item.image || 'Images/book1.jpg'}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='Images/book1.jpg'">
			</div>
			<div class="cart-item-details" style="flex: 1;">
				<h3 style="font-size: 2rem; color: var(--black); margin-bottom: 0.5rem; font-weight: 600;">${item.title || 'Book'}</h3>
				${item.author ? `<p style="font-size: 1.4rem; color: var(--light-color); margin-bottom: 1rem;">${item.author}</p>` : ''}
				<div class="cart-item-price" style="font-size: 2rem; color: var(--black); font-weight: 600;">
					$${price.toFixed(2)}
				</div>
			</div>
			<div class="cart-item-actions" style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
				<button class="btn add-to-cart-from-wishlist" data-index="${index}" style="padding: 1rem 2rem; font-size: 1.5rem; white-space: nowrap;">
					<i class="fas fa-shopping-cart"></i> Add to Cart
				</button>
				<a href="book-detail.html?title=${encodeURIComponent(item.title)}&price=${price}&image=${encodeURIComponent(item.image || '../Images/book1.jpg')}&author=${encodeURIComponent(item.author || 'Author Name')}" class="btn" style="padding: 1rem 2rem; font-size: 1.5rem; white-space: nowrap; text-decoration: none; display: inline-block;">
					<i class="fas fa-eye"></i> View Details
				</a>
			</div>
			<button class="cart-item-remove wishlist-remove" data-index="${index}" data-title="${item.title}" style="width: 45px; height: 45px; border: none; background: #fee; color: #e74c3c; border-radius: 0.5rem; cursor: pointer; font-size: 1.8rem; display: flex; align-items: center; justify-content: center; transition: all 0.3s;">
				<i class="fas fa-times"></i>
			</button>
		`;

		wishlistEl.appendChild(bookCard);
	});
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
	updateCartCountUI();
	updateWishlistCountUI();
	renderWishlist();

	// Remove from wishlist
	document.addEventListener('click', (e) => {
		const removeBtn = e.target.closest('.wishlist-remove');
		if (removeBtn) {
			e.preventDefault();
			e.stopPropagation();
			const title = removeBtn.getAttribute('data-title');
			if (title) {
				removeFromWishlist(title);
				renderWishlist();
				
				// Show notification
				const notification = document.createElement('div');
				notification.textContent = 'Removed from wishlist!';
				Object.assign(notification.style, {
					position: 'fixed',
					top: '20px',
					right: '20px',
					background: '#e74c3c',
					color: 'white',
					padding: '15px 20px',
					borderRadius: '5px',
					zIndex: '10000',
					fontFamily: 'Poppins, sans-serif',
					fontSize: '14px',
					boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
				});
				document.body.appendChild(notification);
				setTimeout(() => notification.remove(), 2000);
			}
		}

		// Add to cart from wishlist
		const addToCartBtn = e.target.closest('.add-to-cart-from-wishlist');
		if (addToCartBtn) {
			e.preventDefault();
			e.stopPropagation();
			const index = parseInt(addToCartBtn.getAttribute('data-index'));
			const wishlist = getWishlistItems();
			if (wishlist[index]) {
				const book = wishlist[index];
				addToCart(book);
				
				// Show notification
				const notification = document.createElement('div');
				notification.textContent = 'Book added to cart!';
				Object.assign(notification.style, {
					position: 'fixed',
					top: '20px',
					right: '20px',
					background: '#27ae60',
					color: 'white',
					padding: '15px 20px',
					borderRadius: '5px',
					zIndex: '10000',
					fontFamily: 'Poppins, sans-serif',
					fontSize: '14px',
					boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
				});
				document.body.appendChild(notification);
				setTimeout(() => notification.remove(), 2000);

				// Update button
				addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added!';
				addToCartBtn.style.background = '#27ae60';
				setTimeout(() => {
					addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
					addToCartBtn.style.background = '';
				}, 2000);
			}
		}
	});
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', () => {
	const scrollBtn = document.createElement("button");
	scrollBtn.id = "scrollTopBtn";
	scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
	scrollBtn.setAttribute("aria-label", "Scroll to top");
	scrollBtn.setAttribute("title", "Back to top");
	
	document.body.appendChild(scrollBtn);

	let ticking = false;
	window.addEventListener("scroll", () => {
		if (!ticking) {
			requestAnimationFrame(() => {
				if (window.scrollY > 200) {
					scrollBtn.classList.add("show");
				} else {
					scrollBtn.classList.remove("show");
				}
				ticking = false;
			});
			ticking = true;
		}
	});

	scrollBtn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
});
