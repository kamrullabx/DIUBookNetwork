# 📚 DIU Book Network - Online Book Store

<div align="center">

![DIU Book Network](https://img.shields.io/badge/DIU-Book%20Network-27ae60?style=for-the-badge&logo=book&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Design-2ecc71?style=for-the-badge)

**Modern, responsive online bookstore with 21 categories, shopping cart, wishlist, and beautiful UI**

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github)](https://github.com/kamrullabx/DIUBookNetwork)
[![Live Demo](https://img.shields.io/badge/Live-Demo-27ae60?style=flat)](https://kamrullabx.github.io/DIUBookNetwork/)

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Project Structure](#-project-structure) • [Getting Started](#-getting-started) • [Pages](#-pages) • [Contributors](#-contributors)

</div>

---

## 🔗 Links

- **🌐 Live Demo**: [View on GitHub Pages](https://kamrullabx.github.io/DIUBookNetwork/)
- **📦 Repository**: [GitHub](https://github.com/kamrullabx/DIUBookNetwork)
- **📄 Project Report**: See [PROJECT_REPORT.md](PROJECT_REPORT.md) for detailed documentation

---

## 📖 About

**DIU Book Network** is a comprehensive, fully-featured online bookstore built with vanilla HTML, CSS, and JavaScript. It offers a seamless shopping experience with 21 book categories, persistent shopping cart, wishlist functionality, and a modern, colorful UI design optimized for all devices.

---

## ✨ Features

### 🎨 **Design & UI**
- **Modern Colorful Design**: Vibrant gradient backgrounds and color-coded category cards
- **Fully Responsive**: Optimized for mobile, tablet, laptop, and desktop devices
- **Smooth Animations**: Transitions, hover effects, and interactive elements
- **Loading Screen**: Elegant loader with smooth fade-out animation
- **Back to Top Button**: Floating button with smooth scroll and animations

### 📚 **Book Categories** (21 Categories)
- Fiction • Non-Fiction • Science • Technology • Computer Science
- Programming • Web Development • Data Science • AI & ML • Mystery
- Romance • Fantasy • Thriller • History • Biography • Self-Help
- Children • Young Adult • Business • Art & Design • Poetry

Each category has:
- Dedicated landing page with hero section
- Grid of 10 books with Google Books API covers
- Beautiful category banners with descriptions
- Breadcrumb navigation

### 🛒 **Shopping Features**
- **Shopping Cart**:
  - Add/remove items
  - Quantity management (increase/decrease)
  - Persistent storage (localStorage)
  - Real-time cart count badge
  - Cart summary with subtotal and total
  - Empty cart state
  
- **Wishlist**:
  - Add/remove books to wishlist
  - Persistent storage (localStorage)
  - Real-time wishlist count badge
  - Dedicated wishlist page
  - Quick add to cart from wishlist

### 📄 **Pages & Navigation**
- **Main Pages**:
  - Homepage with hero section, featured books, arrivals, deals, reviews
  - Category listing page
  - Book detail pages
  - Shopping cart page
  - Wishlist page
  - Blogs page (grid layout)
  
- **Additional Pages**:
  - Our Locations (with map integration)
  - Featured Books
  - New Arrivals
  - Client Reviews
  - Our Services (colorful cards)
  - Payment Methods (with icons)
  - Privacy Policy
  - Account Info
  - Ordered Items
  - Custom 404 Error Page (with animations)

### ⚡ **Performance & UX**
- **Optimized Loading**: 
  - Image lazy loading
  - Skeleton UI for book cards
  - API result caching
  - Prefetching for popular categories
  
- **Smooth Interactions**:
  - Swiper.js carousels with autoplay
  - Throttled scroll events (requestAnimationFrame)
  - Smooth scroll behavior
  - Toast notifications

### ♿ **Accessibility**
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Alt text for images

### 📱 **Mobile Features**
- Bottom navigation bar
- Mobile-optimized header
- Touch-friendly buttons
- Responsive grid layouts
- Mobile-first approach

---

## 🛠️ Tech Stack

### **Core Technologies**
- **HTML5**: Semantic markup
- **CSS3**: 
  - Custom properties (CSS Variables)
  - Flexbox & Grid layouts
  - Media queries for responsiveness
  - Animations & transitions
- **JavaScript (ES6+)**:
  - Vanilla JS (no frameworks)
  - DOM manipulation
  - Event handling
  - LocalStorage API
  - Fetch API

### **Libraries & CDNs**
- **Swiper.js** (v7): Carousel sliders
- **Font Awesome**: Icons
- **Google Fonts**: Poppins font family
- **Google Books API**: Book cover images
- **Google Maps**: Location integration

---

## 📁 Project Structure

```
DIU/
│
├── index.html              # Main homepage
├── README.md               # Project documentation
├── .htaccess               # Apache 404 redirect configuration
│
├── CSS/
│   └── style.css           # All styles (responsive, animations, themes)
│
├── js/
│   ├── index.js            # Main JavaScript (homepage functionality)
│   ├── category.js         # Category pages logic (API, rendering)
│   ├── cart.js             # Shopping cart functionality
│   ├── wishlist.js         # Wishlist functionality
│   └── book-detail.js      # Book detail page logic
│
├── Images/                 # Image assets
│   ├── book1.jpg - book10.jpg
│   ├── blog images
│   └── backgrounds
│
├── pages/                  # Secondary pages
│   ├── 404.html            # Custom error page
│   ├── cart.html           # Shopping cart
│   ├── wishlist.html       # Wishlist
│   ├── book-detail.html    # Individual book details
│   ├── categories.html     # All categories listing
│   ├── blogs.html          # Blog posts grid
│   ├── featured.html       # Featured books
│   ├── arrivals.html       # New arrivals
│   ├── reviews.html        # Client reviews
│   ├── locations.html      # Store locations
│   ├── our-services.html   # Services page
│   ├── payment-method.html # Payment options
│   ├── privacy-policy.html # Privacy policy
│   ├── account-info.html   # Account information
│   └── ordered-items.html  # Order history
│
└── categories/             # Category pages (21 files)
    ├── Fiction.html
    ├── Non-Fiction.html
    ├── Science.html
    ├── Technology.html
    ├── Computer-Science.html
    ├── Programming.html
    ├── Web-Development.html
    ├── Data-Science.html
    ├── AI-ML.html
    ├── Mystery.html
    ├── Romance.html
    ├── Fantasy.html
    ├── Thriller.html
    ├── History.html
    ├── Biography.html
    ├── Self-Help.html
    ├── Children.html
    ├── Young-Adult.html
    ├── Business.html
    ├── Art-Design.html
    └── Poetry.html
```

---

## 🚀 Getting Started

### **Prerequisites**
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)
- Internet connection (for CDN resources and API calls)

### **Installation**

1. **Clone the repository**:
```bash
git clone https://github.com/kamrullabx/DIUBookNetwork.git
cd DIUBookNetwork/DIU
```

2. **Open in browser**:
   - **Option 1**: Double-click `index.html` (limited functionality)
   - **Option 2**: Use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. **Access**: Open `http://localhost:8000` in your browser

### **For Production Deployment**

#### **GitHub Pages**
1. Push repository to GitHub: [DIUBookNetwork](https://github.com/kamrullabx/DIUBookNetwork)
2. Go to Settings → Pages
3. Select branch: `main` (or `master`)
4. Select folder: `/ (root)`
5. Save and wait for deployment
6. Access via: [https://kamrullabx.github.io/DIUBookNetwork/](https://kamrullabx.github.io/DIUBookNetwork/)

#### **Apache Server**
- Place files in web root directory
- `.htaccess` is already configured for 404 redirects
- Ensure mod_rewrite is enabled

#### **Other Hosting**
- Upload all files maintaining directory structure
- Ensure `index.html` is in root
- All paths are relative, so should work on any static host

---

## 📄 Pages Overview

### **Main Pages**

#### 🏠 **Homepage** (`index.html`)
- Hero section with call-to-action
- 21 colorful category cards
- Featured books carousel
- New arrivals slider
- Deal of the day section
- Service icons (Free Shipping, Secure Payment, etc.)
- Client reviews carousel
- Footer with links and contact info

#### 📚 **Category Pages** (`categories/*.html`)
- Hero banner with category description
- Grid of 10 books with covers from Google Books API
- Breadcrumb navigation
- "Add to Cart" functionality
- Book detail links

#### 🛒 **Shopping Cart** (`pages/cart.html`)
- List of cart items with images
- Quantity controls (+, -)
- Remove item functionality
- Cart summary (subtotal, total)
- Continue shopping button
- Empty cart state

#### ❤️ **Wishlist** (`pages/wishlist.html`)
- List of wishlisted books
- Add to cart from wishlist
- Remove from wishlist
- Continue shopping button
- Empty wishlist state

#### 📖 **Book Detail** (`pages/book-detail.html`)
- Book cover image
- Title, author, description
- Price information
- Add to Cart button
- Add to Wishlist button
- Related information

#### 📰 **Blogs** (`pages/blogs.html`)
- Grid layout of blog posts
- Blog cards with images
- Meta information (date, author)
- Read more links
- 7 blog posts included

#### 🗺️ **Locations** (`pages/locations.html`)
- Store locations with addresses
- Contact information (masked phone numbers)
- Interactive Google Maps integration

---

## 🎨 Customization

### **Changing Colors & Theme**
Edit CSS variables in `CSS/style.css`:
```css
:root {
    --green: #27ae60;
    --black: #192a56;
    --light-color: #666;
    --box-shadow: 0 0.5rem 1.5rem rgba(0,0,0,0.1);
    /* Add more variables */
}
```

### **Adding Books**
1. Update book data in respective JavaScript files
2. Add images to `Images/` folder
3. Update book arrays in:
   - `js/index.js` (featured, arrivals)
   - `js/category.js` (category books)

### **Modifying Categories**
1. Edit category cards in `index.html`
2. Add/remove category HTML files in `categories/` folder
3. Update category data in `js/category.js`

### **Adjusting Sliders**
Edit Swiper settings in `js/index.js`:
```javascript
autoplay: {
    delay: 3500,
    disableOnInteraction: false,
},
slidesPerView: 1,
spaceBetween: 20,
breakpoints: {
    /* Customize breakpoints */
}
```

---

## 📱 Responsive Breakpoints

The website is optimized for:
- **Mobile**: < 450px
- **Tablet**: 450px - 768px
- **Laptop**: 768px - 991px
- **Desktop**: 991px - 1200px
- **Large Desktop**: > 1200px

Media queries are defined in `CSS/style.css` for all major components.

---

## 🧪 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)
- ⚠️ Internet Explorer 11 (limited support)

---

## 🐛 Troubleshooting

### **Swiper Not Working**
- Check internet connection (CDN required)
- Verify Swiper script is loaded
- Check browser console for errors

### **Icons Missing**
- Ensure Font Awesome CDN is accessible
- Check network tab for failed requests
- Verify CDN link in HTML head

### **Cart/Wishlist Not Persisting**
- Check browser localStorage support
- Ensure JavaScript is enabled
- Clear browser cache and try again

### **Images Not Loading**
- Verify image paths are correct
- Check Google Books API availability
- Ensure fallback images exist

### **404 Page Not Redirecting**
- For Apache: Ensure `.htaccess` is enabled
- For other servers: Configure 404 handler manually
- Check file path in `.htaccess`

---

## 🚧 Known Limitations

- Cart/Wishlist data is stored locally (per browser)
- No backend integration (static site)
- Book covers depend on Google Books API
- Payment integration is UI-only (not functional)

---

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication system
- [ ] Payment gateway integration
- [ ] Book search functionality
- [ ] Reviews and ratings system
- [ ] Order tracking
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Dark mode theme
- [ ] PWA support (offline functionality)
- [ ] Multi-language support
- [ ] Book recommendations engine

---

## 📝 Code Style

- **HTML**: Semantic, accessible markup
- **CSS**: BEM-like naming, mobile-first approach
- **JavaScript**: ES6+, modular functions, event delegation
- **Comments**: Clear, descriptive comments in code

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit with clear messages**:
   ```bash
   git commit -m "Add: description of your feature"
   ```
5. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

### **Contribution Guidelines**
- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure responsiveness
- Update documentation if needed

---

## 👥 Contributors

This project is maintained by:

- **Kamrul Hossain** - [@kamrullabx](https://github.com/kamrullabx)
- **Khandokar Masud**
- **Moriam Akter**
- **Umaya Jannat Urmi**
- **Tas Kir**

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Fonts**: [Google Fonts](https://fonts.google.com/)
- **Sliders**: [Swiper.js](https://swiperjs.com/)
- **Book Covers**: [Google Books API](https://developers.google.com/books)
- **Maps**: [Google Maps](https://developers.google.com/maps)

---

## 📞 Contact & Support

For questions, suggestions, or support:
- **Repository**: [DIUBookNetwork](https://github.com/kamrullabx/DIUBookNetwork)
- **Open an issue**: [GitHub Issues](https://github.com/kamrullabx/DIUBookNetwork/issues)
- **Contact**: [@kamrullabx](https://github.com/kamrullabx)
- Contact the development team

---

<div align="center">

**Made with ❤️ by DIU Book Network Team**

© 2025 All rights reserved

[⬆ Back to Top](#-diu-book-network---online-book-store)

</div>
