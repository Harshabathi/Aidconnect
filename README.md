
# 🌐 AidConnect

**AidConnect** is a web-based platform built to assist in **natural disasters or calamities** by connecting **donors** who provide aid with **recipients** in need. It offers real-time chat functionality and secure authentication, enabling fast and reliable communication when it matters most.

> 🔄 Built with the MERN stack (without React) using **Bootstrap** for the frontend UI.

---

## 🚀 Features

- 🗺️ **Location-Based Search** – Temporary integration with **Mapbox Geocoding API** for address/location lookup

- 🆘 **Disaster Relief Platform** – Share and request aid in critical times.
- 👥 **Role-based Access** – Donors can post aids; recipients can view and initiate contact.
- 💬 **Real-Time Chat** – Built using **Socket.IO**, allowing instant conversations between users.
- 🔐 **Secure Login** – Authentication and session handling powered by **Passport.js**.
- 🎨 **Responsive UI** – Styled with **Bootstrap** for quick, mobile-friendly layout.
- ⚙️ **MERN Stack without React**:
  - MongoDB
  - Express.js
  - Node.js
  - Bootstrap + EJS (or HTML) on frontend
- 📲 **PWA Support (Coming Soon)** – Aim to make it installable and offline-capable in the next phase.
- 👨‍💻 **Cursor** was used as a coding assistant while implementing **Socket.IO** chat.

---

## ⚙️ Tech Stack

| Technology    | Purpose                          |
|---------------|----------------------------------|
| **MongoDB Atlas** | Cloud-hosted MongoDB database         |
| **Express.js**| Web framework for Node.js        |
| **Node.js**   | Backend JavaScript runtime       |
| **Bootstrap** | Responsive frontend UI framework |
| **Socket.IO** | Real-time bidirectional communication |
| **Passport.js** | Authentication and session management |
| **EJS / HTML**| Server-rendered pages            |
| **Mapbox Geocoding API** | Temporary geolocation feature to convert addresses into coordinates |
| **Render** | Hosting platform for backend/frontend deployment |

| Technology    | Purpose                          |
|---------------|----------------------------------|
| **MongoDB**   | NoSQL database for storing users, messages, and aid data |
| **Express.js**| Web framework for Node.js        |
| **Node.js**   | Backend JavaScript runtime       |
| **Bootstrap** | Responsive frontend UI framework |
| **Socket.IO** | Real-time bidirectional communication |
| **Passport.js** | Authentication and session management |
| **EJS / HTML**| Server-rendered pages            |

---

## 🧪 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB
- `.env` file with:

  env
- MONGO_URI=your_mongodb_connection
- SESSION_SECRET=your_session_secret
- PORT=8000
- CLIENT_URL=http://localhost:8000


---

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/aidconnect.git
   cd aidconnect
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm start
   \`\`\`

4. Visit \`http://localhost:8000\` in your browser.

---

## 💬 Chat Feature

- Socket.IO enables live chat between donor and recipient.
- Messages are exchanged in real time (stored optionally if persistent chat is implemented).
- Cursor.dev assisted in integrating this feature efficiently.

---

## 🛠️ Planned Improvements

- [ ] Convert to a **Progressive Web App (PWA)**  
- [ ] Store chat history  
- [ ] Implement notifications  
- [ ] Enable NGO registration and verification  

---


## 🌍 Live Website

Access the deployed project here: [AidConnect on Render]((https://aidconnect-glcj.onrender.com/))

