// Cart functions
function getCartItems(){
	try { return JSON.parse(localStorage.getItem('cartItems')||'[]'); } catch { return []; }
}
function setCartItems(items){ localStorage.setItem('cartItems', JSON.stringify(items)); }
function getCartCount(){ return getCartItems().reduce((sum,it)=>sum + (it.quantity||1), 0); }
function updateCartCountUI(){
	const headerBadge = document.querySelector('.cart-count');
	const n = getCartCount();
	if (headerBadge){
		headerBadge.innerText = n;
		headerBadge.setAttribute('aria-label', `${n} items in cart`);
	}
}

function formatPrice(n){ return `$${n.toFixed(2)}`; }

function renderCart(){
	const items = getCartItems();
	const cartItemsEl = document.getElementById('cart-items');
	const emptyCartEl = document.getElementById('empty-cart');
	const summaryEl = document.getElementById('cart-summary');
	const cartWrapper = document.querySelector('.cart-wrapper');
	
	if (!cartItemsEl || !emptyCartEl || !summaryEl) {
		console.error('Cart elements not found!');
		return;
	}
	
	if (items.length === 0){
		emptyCartEl.style.display = 'block';
		summaryEl.style.display = 'none';
		cartItemsEl.innerHTML = '';
		updateCartCountUI();
		return;
	}
	
	emptyCartEl.style.display = 'none';
	summaryEl.style.display = 'block';
	
	// Render cart items
	cartItemsEl.innerHTML = '';
	let subtotal = 0;
	
	items.forEach((item, index) => {
		// Handle both 'price' and 'currentPrice' field names
		const price = parseFloat(item.price || item.currentPrice) || 0;
		const quantity = item.quantity || 1;
		const itemTotal = price * quantity;
		subtotal += itemTotal;
		
		const itemEl = document.createElement('div');
		itemEl.className = 'cart-item';
		itemEl.innerHTML = `
			<div class="cart-item-image">
				<img src="${item.image || 'Images/book1.jpg'}" alt="${item.title || 'Book'}" onerror="this.src='Images/book1.jpg';">
			</div>
			<div class="cart-item-details">
				<h3>${item.title || 'Book Title'}</h3>
				<p class="cart-item-price">${formatPrice(price)}</p>
			</div>
			<div class="cart-item-quantity">
				<button type="button" class="qty-btn minus" data-index="${index}" aria-label="Decrease quantity">-</button>
				<span class="qty-value">${quantity}</span>
				<button type="button" class="qty-btn plus" data-index="${index}" aria-label="Increase quantity">+</button>
			</div>
			<div class="cart-item-total">
				<span>${formatPrice(itemTotal)}</span>
			</div>
			<button type="button" class="cart-item-remove" data-index="${index}" aria-label="Remove item">
				<i class="fas fa-trash"></i>
			</button>
		`;
		cartItemsEl.appendChild(itemEl);
	});
	
	// Update summary
	const subtotalEl = document.getElementById('subtotal');
	const totalEl = document.getElementById('total');
	if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
	if (totalEl) totalEl.textContent = formatPrice(subtotal);
	updateCartCountUI();
}

function removeItem(index){
	const items = getCartItems();
	if (index < 0 || index >= items.length) return;
	
	const removedTitle = items[index].title || 'Item';
	items.splice(index, 1);
	setCartItems(items);
	renderCart();
	
	// Show notification
	const notification = document.createElement('div');
	notification.textContent = 'Item removed from cart!';
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
		boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
		animation: 'slideIn 0.3s ease'
	});
	document.body.appendChild(notification);
	setTimeout(() => {
		notification.style.animation = 'slideOut 0.3s ease';
		setTimeout(() => notification.remove(), 300);
	}, 2000);
}

function updateQuantity(index, change){
	const items = getCartItems();
	if (!items[index]) return;
	
	const newQty = (items[index].quantity || 1) + change;
	if (newQty < 1){
		removeItem(index);
		return;
	}
	
	items[index].quantity = newQty;
	setCartItems(items);
	renderCart();
}

// Wishlist functions for header
function getWishlistItems() {
	try {
		return JSON.parse(localStorage.getItem('wishlistItems') || '[]');
	} catch {
		return [];
	}
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

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
	console.log('Cart page loaded');
	const items = getCartItems();
	console.log('Cart items:', items);
	renderCart();
	updateCartCountUI();
	updateWishlistCountUI();
	
	// Quantity controls - use event delegation on document
	document.addEventListener('click', (e) => {
		const minusBtn = e.target.closest('.qty-btn.minus');
		const plusBtn = e.target.closest('.qty-btn.plus');
		const removeBtn = e.target.closest('.cart-item-remove');
		
		if (minusBtn){
			e.preventDefault();
			e.stopPropagation();
			const index = parseInt(minusBtn.getAttribute('data-index'));
			if (!isNaN(index)){
				updateQuantity(index, -1);
			}
		} else if (plusBtn){
			e.preventDefault();
			e.stopPropagation();
			const index = parseInt(plusBtn.getAttribute('data-index'));
			if (!isNaN(index)){
				updateQuantity(index, 1);
			}
		} else if (removeBtn){
			e.preventDefault();
			e.stopPropagation();
			const index = parseInt(removeBtn.getAttribute('data-index'));
			if (!isNaN(index)){
				removeItem(index);
			}
		}
	});
	
	// Checkout button
	const checkoutBtn = document.getElementById('checkout-btn');
	if (checkoutBtn){
		checkoutBtn.addEventListener('click', () => {
			alert('Checkout functionality will be implemented soon!');
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
