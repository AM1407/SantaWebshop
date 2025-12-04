🎅 Santa's Webshop

"The official supply procurement portal for North Pole Elves."

A fully functional, festive E-Commerce application built with TypeScript and Vite. It features user authentication, a dynamic product grid, a shopping cart with complex state management, and a real-world checkout integration that sends actual emails via EmailJS.

[🚀 View Live Demo on GitHub Pages](https://am1407.github.io/SantaWebshop/)

(Note: The json-server backend is mocked for the live demo, or requires a local backend to be running.)

🎄 Key Features

🔒 Authentication System:

Secure login simulation with localStorage and sessionStorage persistence.

"Remember Me" functionality.

Password visibility toggle.

🎁 Dynamic Product Grid:

Products fetched from a REST API (json-server).

Real-time search filtering by name and category.

Festive "Gift Card" UI design with hover effects.

🛒 Shopping Cart Logic:

Add/Remove items with state persistence.

Quantity adjustments.

Automatic total calculation.

✨ UX/UI Polish:

Glassmorphism header and cards.

Toast Notifications for user feedback (replacing native alerts).

Responsive Design using Bootstrap 5.

Snowfall background and festive typography (Mountains of Christmas).

📧 Real-Email Checkout:

Integration with EmailJS to send a formatted HTML receipt to the user's inbox upon checkout.

🛠️ Tech Stack

Frontend: HTML5, CSS3 (Custom Variables + Animations), TypeScript.

Build Tool: Vite.

Framework: Vanilla DOM manipulation (No React/Vue) to demonstrate core JS/TS mastery.

Styling: Bootstrap 5 + Custom CSS.

Backend (Mock): JSON-Server.

Services: EmailJS (Transactional Emails).

📨 The EmailJS Integration

This project avoids a heavy backend for email sending by utilizing EmailJS, a client-side library that connects directly to email services (like Gmail).

How it works:

Cart Data Assembly: When the user clicks "Send to Santa", the checkout.ts script gathers the cart contents.

HTML Generation: A helper function generates an HTML table (<tr>...</tr>) string containing the order items.

API Call: The app sends this string + the user's email to the EmailJS API.

Delivery: EmailJS injects the data into a pre-made HTML template and delivers it to the user.

Setup Steps (If cloning this repo):

Sign up at EmailJS.com.

Create an Email Service (connect your Gmail).

Create an Email Template and use the variable {{{product_rows}}} in the HTML source to render the list.

Get your keys from the Dashboard.

Update src/checkout.ts:

// src/checkout.ts
const SERVICE_ID = "YOUR_SERVICE_ID";   
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";


💻 Running Locally

Clone the repository:

git clone [https://github.com/yourusername/santas-webshop.git](https://github.com/yourusername/santas-webshop.git)
cd santas-webshop


Install dependencies:

npm install


Start the Mock Database:
Open a terminal and run:

npx json-server --watch db.json --port 3000


Start the Application:
Open a second terminal and run:

npm run dev


Open the link provided (usually http://localhost:5173)!

🎅 Ho Ho Ho! Merry Coding!