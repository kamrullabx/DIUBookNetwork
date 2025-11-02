document.addEventListener('DOMContentLoaded', () => {
	const headingEl = document.querySelector('#category-books-heading');
	const grid = document.querySelector('.category-books-grid');

	// Cart helpers
	function getCartItems(){
		try { return JSON.parse(localStorage.getItem('cartItems')||'[]'); } catch { return []; }
	}
	function setCartItems(items){ localStorage.setItem('cartItems', JSON.stringify(items)); }
	function getCartCount(){ return getCartItems().reduce((sum,it)=>sum + (it.quantity||1), 0); }
	function updateCartCountUI(){
		const headerBadge = document.querySelector('.cart-count');
		const floating = document.querySelector('#floatingCartCount');
		const n = getCartCount();
		if (headerBadge){
			headerBadge.innerText = n;
			headerBadge.setAttribute('aria-label', `${n} items in cart`);
		}
		if (floating){ floating.innerText = n; }
	}
	function addToCart(item){
		const items = getCartItems();
		const idx = items.findIndex(it => it.title===item.title);
		if (idx>=0) items[idx].quantity = (items[idx].quantity||1)+1; else items.push({...item, quantity: 1});
		setCartItems(items);
		updateCartCountUI();
	}

	function ensureFloatingCart(){
		if (document.querySelector('.cart-count')) return; // header badge exists
		if (document.querySelector('#floatingCart')) return;
		const btn = document.createElement('a');
		btn.id = 'floatingCart';
		btn.href = '#';
		btn.setAttribute('aria-label','Cart');
		btn.innerHTML = `<i class="fas fa-shopping-cart"></i><span id="floatingCartCount">0</span>`;
		Object.assign(btn.style, {
			position:'fixed', right:'20px', bottom:'20px', background:'#27ae60', color:'#fff',
			borderRadius:'50px', padding:'10px 14px', display:'flex', alignItems:'center', gap:'8px',
			boxShadow:'0 4px 8px rgba(0,0,0,0.2)', zIndex:'10000', textDecoration:'none'
		});
		document.body.appendChild(btn);
		updateCartCountUI();
	}

	// Update cart count in header if exists (no need for floating on category pages with header)
	updateCartCountUI();

	function getCategoryName(){
		// From global set in individual pages, or from title, or filename
		if (window.CATEGORY_NAME) return window.CATEGORY_NAME;
		const t = document.title.replace(/\s*\|.*$/, '').trim();
		if (t && t.toLowerCase() !== 'category') return t;
		const path = window.location.pathname.split('/').pop().replace(/\.html$/,'');
		return decodeURIComponent(path.replace(/-/g,' '));
	}

	function formatPrice(n){ return `$${n.toFixed(2)}`; }

	const CACHE = new Map();
	const GOOGLE_THUMB_CACHE = new Map();

	const DESCRIPTIONS = {
		'Fiction': 'Explore imaginative narratives across classics, contemporary works, and literary gems.',
		'Non-Fiction': 'True stories and insightful works spanning memoirs, history, and ideas.',
		'Science': 'Discover the wonders of physics, biology, astronomy, and more.',
		'Technology': 'Keep up with cutting-edge trends and the future of innovation.',
		'Computer Science': 'From algorithms to operating systems—core CS concepts explained.',
		'Programming': 'Hands-on coding guides, languages, and best practices for developers.',
		'Web Development': 'HTML, CSS, JavaScript and modern frameworks for the web.',
		'Data Science': 'Analytics, statistics, and machine learning for data-driven work.',
		'AI & ML': 'Artificial Intelligence and Machine Learning concepts and applications.',
		'Mystery': 'Whodunits and gripping tales packed with twists and suspense.',
		'Romance': 'Heartfelt stories of love, relationships, and happy endings.',
		'Fantasy': 'Epic worlds, magic systems, and heroic adventures.',
		'Thriller': 'Page-turners with high stakes, pace, and tension.',
		'History': 'Timelines, events, and biographies that shaped our world.',
		'Biography': 'Lives of influential figures from every walk of life.',
		'Self-Help': 'Personal growth, productivity, habits, and well-being.',
		'Children': 'Engaging and educational reads for young minds.',
		'Young Adult': 'Coming-of-age stories and adventures for YA readers.',
		'Business': 'Strategy, leadership, startups, and the global economy.',
		'Art & Design': 'Creativity, techniques, and design inspiration.',
		'Poetry': 'Verse that captures emotion, rhythm, and reflection.'
	};

	function fallbackUrl(category, idx){
		return `https://source.unsplash.com/400x600/?book,cover,${encodeURIComponent(category)}&sig=${idx}`;
	}

	async function fetchGoogleThumb(title){
		if (GOOGLE_THUMB_CACHE.has(title)) return GOOGLE_THUMB_CACHE.get(title);
		const controller = new AbortController();
		const t = setTimeout(()=>controller.abort(), 1200);
		try{
			const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&maxResults=1&printType=books&projection=lite&fields=items(volumeInfo/imageLinks/thumbnail)`;
			const res = await fetch(url, { signal: controller.signal });
			clearTimeout(t);
			if (!res.ok) throw new Error('net');
			const data = await res.json();
			const thumb = data && data.items && data.items[0] && data.items[0].volumeInfo && data.items[0].volumeInfo.imageLinks && data.items[0].volumeInfo.imageLinks.thumbnail;
			if (thumb){
				const httpsThumb = thumb.replace(/^http:/, 'https:');
				GOOGLE_THUMB_CACHE.set(title, httpsThumb);
				return httpsThumb;
			}
			throw new Error('noimg');
		}catch(e){
			clearTimeout(t);
			return null;
		}
	}

	async function render(){
		const category = getCategoryName();
		// Hide duplicate heading since banner shows category name
		if (headingEl) headingEl.closest('.heading')?.style.setProperty('display', 'none');
		if (grid){
			grid.innerHTML = '';
			const frag = document.createDocumentFragment();
			const items = CACHE.get(category) || Array.from({length:10}).map((_,i)=>({
				title: `${category} Book ${i+1}`,
				image: fallbackUrl(category, i+1),
				currentPrice: 9 + i + Math.random()*10,
				oldPrice: 14 + i + Math.random()*12
			}));
			// Enrich parallel
			const enriched = await Promise.all(items.map(async (it,idx)=>{
				const g = await fetchGoogleThumb(it.title);
				return { ...it, image: g || it.image };
			}));
			CACHE.set(category, enriched);
			enriched.forEach(b => {
				const card = document.createElement('a');
				card.className = 'book-card';
				card.setAttribute('role','listitem');
				const detailUrl = `../pages/book-detail.html?title=${encodeURIComponent(b.title)}&price=${b.currentPrice}&oldPrice=${b.oldPrice}&image=${encodeURIComponent(b.image)}&author=Author&description=${encodeURIComponent(`${b.title} - A great read in ${category} category.`)}`;
				card.href = detailUrl;
				card.innerHTML = `
					<div class="image"><img src="${b.image}" alt="${category} - ${b.title}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='../Images/book1.jpg';"></div>
					<div class="content">
						<h3>${b.title}</h3>
						<div class="price">${formatPrice(b.currentPrice)} <span>${formatPrice(b.oldPrice)}</span></div>
						<button type="button" class="cart-btn">Add to Cart</button>
					</div>
				`;
				frag.appendChild(card);
			});
			grid.appendChild(frag);
		}
	}

	render();

	// Delegated add-to-cart handler for dynamically added buttons
	document.addEventListener('click', (e) => {
		const btn = e.target.closest('.cart-btn');
		if (!btn || btn.closest('.book-card') === null) return;
		e.preventDefault();
		e.stopPropagation(); // Prevent card navigation
		
		const card = btn.closest('.book-card');
		const titleEl = card ? card.querySelector('h3') : null;
		const priceEl = card ? card.querySelector('.price') : null;
		const imgEl = card ? card.querySelector('img') : null;
		const title = titleEl ? titleEl.textContent.trim() : 'Book';
		let price = 0;
		if (priceEl){
			const m = priceEl.textContent.match(/([0-9]+(?:\.[0-9]+)?)/);
			price = m ? parseFloat(m[1]) : 0;
		}
		const image = imgEl ? imgEl.getAttribute('src') : '';
		
		addToCart({ title, price, image });
		btn.innerHTML = '✔ Added!';
		btn.style.background = '#27ae60';
		setTimeout(()=>{ 
			btn.innerHTML = 'Add to Cart'; 
			btn.style.background = '';
		}, 1500);
		
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

