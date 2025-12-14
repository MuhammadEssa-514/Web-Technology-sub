
function loadNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    fetch('navbar_content.html')
     .then(response => response.text())
     .then(html => {
        placeholder.innerHTML = html;
        highlightActiveLink(); 
     })
     .catch(err => {
         console.error('Error loading navbar content:', err);
         placeholder.innerHTML = '<p style="color:red;padding:15px;text-align:center;">Error: Could not load navigation menu. Ensure you are running a local server (e.g., Live Server).</p>';
     });
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => link.classList.remove('active-link'));

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (!href || href === '#' || href.startsWith('javascript')) return;

        const linkPath = new URL(link.href).pathname.toLowerCase();

        if (currentPath === linkPath) {
            link.classList.add('active-link');

            const dropdownMenu = link.closest('.dropdown-menu');
            if (dropdownMenu) {
                const parentLink = dropdownMenu.previousElementSibling;
                if (parentLink) {
                    parentLink.classList.add('active-link');
                }
            }
        }
    });
}


function injectNavbarStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Variables for easy color change */
        :root {
            --nav-bg: #222222;
            --highlight-color: #ff8c00;
            --text-color: #f0f0f0;
            --hover-bg: #333333;
        }

        /* Navbar Container */
        .navbar {
            background-color: var(--nav-bg);
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        /* Logo/Brand Name */
        .brand-logo {
            color: var(--highlight-color);
            font-size: 1.6rem;
            font-weight: 700;
            text-decoration: none;
            letter-spacing: 0.5px;
        }

        /* Navigation Links List */
        .nav-links {
            list-style: none;
            display: flex;
            margin: 0;
            padding: 0;
            flex-wrap: nowrap;
        }

        .nav-links li {
            position: relative; 
            min-width: 120px; 
            text-align: center;
        }

        .nav-links li a {
            color: var(--text-color);
            text-decoration: none;
            padding: 10px 15px;
            display: block;
            border-radius: 5px;
            transition: all 0.3s ease-in-out; 
            font-weight: 500;
            position: relative;
        }

        /* --- Underline Effect --- */
        .nav-links li a::after {
            content: '';
            position: absolute;
            width: 0;
            height: 3px; 
            background: var(--highlight-color);
            left: 50%;
            bottom: 0;
            transition: width 0.3s ease-out, left 0.3s ease-out;
        }
        
        .nav-links li a:hover::after {
            width: 80%; 
            left: 10%; 
        }
        
        .nav-links li a:hover {
            background-color: var(--hover-bg);
            color: var(--highlight-color); 
            transform: translateY(-2px); 
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); 
        }
        
        /* --- ACTIVE LINK STYLING (The Fix) --- */
        .active-link {
            color: var(--highlight-color) !important;
            background-color: var(--hover-bg);
        }
        
        /* Ensures active links don't show the hover underline, but a solid one */
        .active-link::after {
            width: 80% !important; 
            left: 10% !important; 
        }
        
        /* --- Dropdown Specific Styling --- */
        .dropdown-menu {
            display: none; 
            position: absolute;
            top: 100%; 
            left: 0;
            background-color: var(--hover-bg); 
            min-width: 180px;
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5);
            z-index: 2000;
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .dropdown-menu li a {
            padding: 12px 16px;
            color: var(--text-color);
            white-space: nowrap; 
            border-bottom: 1px solid #444;
            transform: none; 
        }
        
        .dropdown-menu li a:hover {
            background-color: #555;
            color: var(--highlight-color);
        }

        /* Show Dropdown on Parent Hover */
        .nav-links li:hover .dropdown-menu {
            display: block;
        }
        
        /* Hamburger Icon (CSS remains the same) */
        .menu-toggle {
            display: none;
            flex-direction: column;
            cursor: pointer;
            z-index: 1001;
        }

        .bar {
            width: 28px;
            height: 3px;
            background-color: white;
            margin: 5px 0;
            transition: all 0.4s ease; 
        }
        
        .menu-toggle.active .bar:nth-child(2) { opacity: 0; }
        .menu-toggle.active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .menu-toggle.active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
        
        /* MEDIA QUERY: NEW BREAKPOINT (900px) */
        @media (max-width: 900px) { 
            .nav-links {
                display: none; 
                width: 100%;
                flex-direction: column; 
                background-color: var(--nav-bg); 
                position: absolute;
                top: 60px; 
                left: 0;
                max-height: 0; 
                overflow: hidden;
                transition: max-height 0.4s ease-in-out;
            }

            .nav-links.active {
                display: flex;
                max-height: 500px;
            }

            .nav-links li {
                min-width: 100%; 
                text-align: left;
            }

            .nav-links li a {
                border-radius: 0;
                border-bottom: 1px solid #333;
            }
            
             .nav-links li a::after {
                display: none; 
            }

            /* DROPDOWN IN MOBILE VIEW */
            .dropdown-menu {
                position: static; 
                width: 100%;
                box-shadow: none;
                background-color: var(--hover-bg);
            }
            
            .dropdown-menu li a {
                padding-left: 35px; 
                font-size: 0.95rem;
                background-color: #444;
                border-bottom: 1px solid #555;
            }
            
            .menu-toggle {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
    injectNavbarStyles();
    loadNavbar();
});