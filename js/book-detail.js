// Cart helpers
function getCartItems(){
	try { return JSON.parse(localStorage.getItem('cartItems')||'[]'); } catch { return []; }
}
function setCartItems(items){ localStorage.setItem('cartItems', JSON.stringify(items)); }
function getCartCount(){ return getCartItems().reduce((sum,it)=>sum + (it.quantity||1), 0); }
function updateCartCountUI(){
	const countEl = document.querySelector('.cart-count');
	if (countEl){
		const n = getCartCount();
		countEl.innerText = n;
		countEl.setAttribute('aria-label', `${n} items in cart`);
	}
}

function addToCart(book){
	const items = getCartItems();
	const idx = items.findIndex(it => it.title===book.title);
	if (idx>=0) {
		items[idx].quantity = (items[idx].quantity||1)+1;
	} else {
		items.push({
			title: book.title,
			price: book.price,
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

function updateWishlistCountUI() {
	const countEl = document.querySelector('.wishlist-count');
	if (countEl) {
		const wishlist = getWishlistItems();
		const count = wishlist.length;
		countEl.innerText = count;
		countEl.setAttribute('aria-label', `${count} items in wishlist`);
		if (count === 0) {
			countEl.style.display = 'none';
		} else {
			countEl.style.display = 'flex';
		}
	}
}

function addToWishlist(book) {
	const wishlist = getWishlistItems();
	const exists = wishlist.some(item => item.title === book.title);
	
	if (!exists) {
		wishlist.push({
			title: book.title,
			price: book.price,
			image: book.image,
			author: book.author || 'Author Name',
			addedAt: new Date().toISOString()
		});
		setWishlistItems(wishlist);
		return true;
	}
	return false;
}

function removeFromWishlist(bookTitle) {
	const wishlist = getWishlistItems();
	const filtered = wishlist.filter(item => item.title !== bookTitle);
	setWishlistItems(filtered);
}

function isInWishlist(bookTitle) {
	const wishlist = getWishlistItems();
	return wishlist.some(item => item.title === bookTitle);
}

function updateWishlistButton() {
	const wishlistBtn = document.querySelector('.wishlist-btn');
	if (!wishlistBtn || !window.BOOK_DATA) return;
	
	if (isInWishlist(window.BOOK_DATA.title)) {
		wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
		wishlistBtn.style.background = 'var(--purple)';
		wishlistBtn.style.color = '#fff';
		wishlistBtn.style.borderColor = 'var(--purple)';
	} else {
		wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Wishlist';
		wishlistBtn.style.background = '#fff';
		wishlistBtn.style.color = 'var(--black)';
		wishlistBtn.style.borderColor = 'var(--purple)';
	}
}

function updateWishlistCountUI() {
	const countEl = document.querySelector('.wishlist-count');
	if (countEl) {
		const wishlist = getWishlistItems();
		const count = wishlist.length;
		countEl.innerText = count;
		countEl.setAttribute('aria-label', `${count} items in wishlist`);
		if (count === 0) {
			countEl.style.display = 'none';
		} else {
			countEl.style.display = 'flex';
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	updateCartCountUI();
	updateWishlistCountUI();
	updateWishlistButton();

	const addToCartBtn = document.getElementById('book-add-to-cart');
	if (addToCartBtn && window.BOOK_DATA) {
		addToCartBtn.addEventListener('click', () => {
			addToCart(window.BOOK_DATA);
			addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added to Cart!';
			addToCartBtn.style.background = '#27ae60';
			
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
			
			setTimeout(() => {
				addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
				addToCartBtn.style.background = '';
				notification.remove();
			}, 2000);
		});
	}

	// Wishlist button functionality
	const wishlistBtn = document.querySelector('.wishlist-btn');
	if (wishlistBtn && window.BOOK_DATA) {
		wishlistBtn.addEventListener('click', () => {
			const book = window.BOOK_DATA;
			const wasInWishlist = isInWishlist(book.title);
			
			if (wasInWishlist) {
				removeFromWishlist(book.title);
				wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Wishlist';
				wishlistBtn.style.background = '#fff';
				wishlistBtn.style.color = 'var(--black)';
				wishlistBtn.style.borderColor = 'var(--purple)';
				updateWishlistCountUI();
				
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
			} else {
				const added = addToWishlist(book);
				if (added) {
					wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
					wishlistBtn.style.background = 'var(--purple)';
					wishlistBtn.style.color = '#fff';
					wishlistBtn.style.borderColor = 'var(--purple)';
					updateWishlistCountUI();
					
					// Show notification
					const notification = document.createElement('div');
					notification.textContent = 'Book added to wishlist!';
					Object.assign(notification.style, {
						position: 'fixed',
						top: '20px',
						right: '20px',
						background: '#e91e63',
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
		});
	}
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
