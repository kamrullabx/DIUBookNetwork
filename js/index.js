// Cache DOM queries for better performance
let searchForm=document.querySelector('.search-form');
let searchBtn=document.querySelector('#search-btn');

searchBtn.onclick=()=>{
    searchForm.classList.toggle('active');
}

// Cache DOM queries for better performance
let loginForm=document.querySelector('.login-form-container');
let loginBtn=document.querySelector('#login-btn');
let closeLoginBtn=document.querySelector('#close-login-btn');

loginBtn.onclick=()=>{
    loginForm.classList.toggle('active');
}

closeLoginBtn.onclick=()=>{
    loginForm.classList.remove('active');
}

// s 
// Throttle scroll events for better performance
let scrollTicking = false;
window.onscroll=()=>{
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            searchForm.classList.remove('active');

            // Cache header query for better performance
            const header2 = document.querySelector('.header .header-2');
            if(window.scrollY>80){
                header2.classList.add('active');
            }
            else{
                header2.classList.remove('active');
            }
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, adding loader-active classes');
    // Add loader-active class to body and html to hide scrollbar
    document.body.classList.add('loader-active');
    document.documentElement.classList.add('loader-active');
    
    if(window.scrollY>80){
        document.querySelector('.header .header-2').classList.add('active');
    }
    else{
        document.querySelector('.header .header-2').classList.remove('active');
    }
    
    console.log('Starting fadeOut timer');
    fadeOut();
});


function loader(){
  console.log('Loader function called, hiding loader');
  const loaderContainer = document.querySelector('.loader-container');
  if (loaderContainer) {
    loaderContainer.classList.add('active');
    document.body.classList.remove('loader-active');
    document.documentElement.classList.remove('loader-active');
    console.log('Loader hidden successfully');
  } else {
    console.error('Loader container not found!');
  }
}

function fadeOut(){
  setTimeout(loader, 2000);
}


// ok 

var booksSwiper = new Swiper(".books-slider", {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 1500, // Reduced from 2500ms to 1500ms
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var featuredSwiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 2000, // Reduced from 3000ms to 2000ms
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next-featured",
    prevEl: ".swiper-button-prev-featured",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

// Cart persistence helpers
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
function addToCart(item){
  const items = getCartItems();
  const idx = items.findIndex(it => it.title===item.title);
  if (idx>=0) items[idx].quantity = (items[idx].quantity||1)+1; else items.push({...item, quantity: 1});
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

// Initialize cart count on load
document.addEventListener('DOMContentLoaded', () => {
	updateCartCountUI();
	updateWishlistCountUI();
	
	// Update wishlist count when storage changes (from other tabs/windows)
	window.addEventListener('storage', (e) => {
		if (e.key === 'wishlistItems') {
			updateWishlistCountUI();
		}
	});
});

// Replace static cart listeners with delegated handler for dynamic content
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.cart-btn');
  if (!btn) return;
  e.preventDefault();

  // Extract item details
  const card = btn.closest('.book-card') || btn.closest('.box');
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

  btn.innerText = "✔ Added!";
  btn.style.background = "#27ae60";
  btn.style.willChange = "background-color";

  const cartCount = document.querySelector(".cart-count");
  if (cartCount){
    let count = parseInt(cartCount.innerText, 10) || 0;
    cartCount.innerText = count + 1;
    cartCount.setAttribute("aria-label", `${count + 1} items in cart`);
  }

  const notification = document.createElement('div');
  notification.textContent = 'Book added to cart!';
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#27ae60",
    color: "white",
    padding: "15px 20px",
    borderRadius: "5px",
    zIndex: "10000",
    fontFamily: "Poppins, sans-serif",
    fontSize: "14px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    willChange: "transform"
  });
  document.body.appendChild(notification);
  setTimeout(() => {
    btn.innerText = "Add to Cart";
    btn.style.background = "#219150";
    btn.style.willChange = "auto";
    notification.remove();
  }, 1200);
});


var arrivalsSwiper = new Swiper(".arrivals-slider", {
    slidesPerView: 3,        // show 3 books at a time
    spaceBetween: 20,        // gap between books
    loop: true,              // infinite loop
    autoplay: {
      delay: 1500,           // auto-slide every 1.5s (reduced from 2.5s)
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next-arrivals",
      prevEl: ".swiper-button-prev-arrivals",
    },
    breakpoints: {           // responsive settings
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  var reviewSwiper = new Swiper(".review-slider", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2000, // Reduced from 3000ms to 2000ms
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next-review",
      prevEl: ".swiper-button-prev-review",
    },
    
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });



  // footer script


document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM queries for better performance
  const footerLinks = document.querySelectorAll(".footer .box a");
  footerLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      link.style.color = "#27ae60"; 
      link.style.transition = "0.3s";
      link.style.willChange = "color"; // Performance optimization
    });
    link.addEventListener("mouseleave", () => {
      link.style.color = "var(--light-color)";
      link.style.willChange = "auto";
    });
  });

  const socialIcons = document.querySelectorAll(".footer .share a");
  socialIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      // Use a more performant way to show message
      const message = "Redirecting to: " + icon.className.split(" ")[1].replace("fa-", "");
      console.log(message); // Better performance than alert
      // You can replace this with a custom notification if needed
    });
  });

  const credit = document.querySelector(".footer .credit");
  const year = new Date().getFullYear();
  if (credit) {
    credit.innerHTML = `Created by <span class="credit-name" style="color: #7c3aed;">Kamrul</span>, <span class="credit-name" style="color: #0d9488;">Masud</span>, <span class="credit-name" style="color: #f97316;">Moriam</span>, <span class="credit-name" style="color: #ec4899;">Umaya</span>, <span class="credit-name" style="color: #3b82f6;">Tanvir</span>, <span class="credit-name" style="color: #22c55e;">Raju</span> | &copy; ${year} All rights reserved!`;
  }
  
  // Also update year span if it exists (for other pages)
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Create scroll button with optimized styling
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scrollTopBtn";
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  scrollBtn.setAttribute("title", "Back to top");
  
  document.body.appendChild(scrollBtn);

  // Throttle scroll events for better performance
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

// Category filtering
document.addEventListener('DOMContentLoaded', () => {
  const categoryCards = document.querySelectorAll('.category-card');
  const featuredContainer = document.querySelector('.featured-slider');
  const arrivalsContainer = document.querySelector('.arrivals-slider');

  function filterByCategory(category) {
    if (featuredContainer) {
      featuredContainer.querySelectorAll('.swiper-slide').forEach(slide => {
        const cat = slide.getAttribute('data-category');
        slide.style.display = (!category || cat === category) ? '' : 'none';
      });
      if (typeof featuredSwiper !== 'undefined') featuredSwiper.update();
    }
    if (arrivalsContainer) {
      arrivalsContainer.querySelectorAll('.swiper-slide').forEach(slide => {
        const cat = slide.getAttribute('data-category');
        slide.style.display = (!category || cat === category) ? '' : 'none';
      });
      if (typeof arrivalsSwiper !== 'undefined') arrivalsSwiper.update();
    }
  }

  // Category cards have href links - let them navigate to category pages naturally
});

// Dynamic Category Books rendering
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.category-books-grid');
  const heading = document.querySelector('#category-books-heading');
  const categoryCards = document.querySelectorAll('.category-card');

  function formatPrice(amount){
    return `$${amount.toFixed(2)}`;
  }

  // In-memory cache for generated books per category (no API)
  const CATEGORY_CACHE = new Map();
  const GOOGLE_THUMB_CACHE = new Map(); // title -> url

  function generateCoverUrl(category, index){
    // Default query-based cover (fallback)
    return `https://source.unsplash.com/400x600/?book,cover,${encodeURIComponent(category)}&sig=${index}`;
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
        // Convert http to https if needed
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

  async function enrichWithGoogleThumbs(items, category){
    // Fetch in parallel with limit (simple chunking)
    const results = await Promise.all(items.map(async (it, idx) => {
      const g = await fetchGoogleThumb(it.title);
      return {
        ...it,
        image: g || it.image || generateCoverUrl(category, idx+1)
      };
    }));
    return results;
  }

  function generateBooksForCategory(category){
    if (CATEGORY_CACHE.has(category)) return CATEGORY_CACHE.get(category);
    const items = Array.from({length:10}).map((_,i)=>({
      title: `${category} Book ${i+1}`,
      image: generateCoverUrl(category, i+1),
      currentPrice: 9 + i + Math.random()*10,
      oldPrice: 14 + i + Math.random()*12
    }));
    CATEGORY_CACHE.set(category, items);
    return items;
  }

  function showSkeleton(count=8){
    if (!grid) return;
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    for(let i=0;i<count;i++){
      const sk = document.createElement('div');
      sk.className = 'book-card';
      sk.innerHTML = `
        <div class=\"image\" style=\"background:#eee\"></div>
        <div class=\"content\">
          <h3 style=\"height:1.6rem;background:#f0f0f0;border-radius:.4rem;margin:0 auto 0.8rem; width:70%\"></h3>
          <div class=\"price\" style=\"height:1.4rem;background:#f0f0f0;border-radius:.4rem;margin:0 auto 1rem; width:40%\"></div>
          <a href=\"#\" class=\"cart-btn\" style=\"visibility:hidden\">Add to Cart</a>
        </div>`;
      frag.appendChild(sk);
    }
    grid.appendChild(frag);
  }

  async function renderCategoryBooks(category){
    if (!grid) return;
    heading.textContent = `${category} Books`;
    showSkeleton(8);
    // base items from cache or generate
    let books = generateBooksForCategory(category);
    // try to enrich with Google thumbs quickly
    books = await enrichWithGoogleThumbs(books, category);
    // cache enriched
    CATEGORY_CACHE.set(category, books);
    // Render
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    books.forEach(b => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.setAttribute('role','listitem');
      card.innerHTML = `
        <div class=\"image\"><img src=\"${b.image}\" alt=\"${category} - ${b.title}\" loading=\"lazy\" decoding=\"async\" onerror=\"this.onerror=null;this.src='Images/book1.jpg';\"></div>
        <div class=\"content\">
          <h3>${b.title}</h3>
          <div class=\"price\">${formatPrice(b.currentPrice)} <span>${formatPrice(b.oldPrice)}</span></div>
          <a href=\"#\" class=\"cart-btn\">Add to Cart</a>
        </div>
      `;
      frag.appendChild(card);
    });
    grid.appendChild(frag);
    document.querySelector('#category-books').scrollIntoView({ behavior:'smooth', block:'start' });
  }

  // Prefill a few categories into cache to speed up first click
  setTimeout(()=>{
    ['Fiction','Programming','Romance'].forEach(cat=>{ if(!CATEGORY_CACHE.has(cat)) generateBooksForCategory(cat); });
  }, 800);

  // Category cards already have href links - no need for JS handler, let them navigate naturally
});

// Slide -> Category page navigation
document.addEventListener('DOMContentLoaded', () => {
  function toSlug(name){
    // Map a few special cases
    const map = {
      'AI & ML': 'AI-ML',
      'Computer Science': 'Computer-Science',
      'Web Development': 'Web-Development',
      'Data Science': 'Data-Science',
      'Non-Fiction': 'Non-Fiction',
      'Art & Design': 'Art-Design',
      'Young Adult': 'Young-Adult'
    };
    if (map[name]) return map[name];
    return name.replace(/\s+/g,'-');
  }

  function rewriteSlideAnchors(container){
    if (!container) return;
    container.querySelectorAll('.swiper-slide').forEach(slide => {
      const cat = slide.getAttribute('data-category');
      if (!cat) return;
      const slug = toSlug(cat);
      // If slide is an anchor, rewrite its href to the category page
      if (slide.tagName === 'A') {
        slide.setAttribute('href', `categories/${slug}.html`);
      }
    });
  }

  function handleSlideClick(e){
    const slide = e.target.closest('.swiper-slide');
    if (!slide) return;
    const cat = slide.getAttribute('data-category');
    if (!cat) return;
    // If it's an anchor with our rewritten href, let default proceed
    if (slide.tagName === 'A') return;
    e.preventDefault();
    const slug = toSlug(cat);
    window.location.href = `categories/${slug}.html`;
  }

  const featured = document.querySelector('.featured-slider');
  const arrivals = document.querySelector('.arrivals-slider');
  rewriteSlideAnchors(featured);
  rewriteSlideAnchors(arrivals);
  if (featured) featured.addEventListener('click', handleSlideClick);
  if (arrivals) arrivals.addEventListener('click', handleSlideClick);
});
