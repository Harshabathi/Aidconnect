
# 🌐 AidConnect

**AidConnect** is a web-based platform built to assist in **natural disasters or calamities** by connecting **donors** who provide aid with **recipients** in need. It offers real-time chat functionality and secure authentication, enabling fast and reliable communication when it matters most.

> 🔄 Built with the MERN stack (without React) using **Bootstrap** for the frontend UI.

---

## 🚀 Features

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

## 📁 Project Structure

\`\`\`
AidConnect/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── views/
│   │   ├── home.ejs
│   │   ├── chat.ejs
│   │   └── ...
│   └── styles/
├── .env
└── README.md
\`\`\`

---

## ⚙️ Tech Stack

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

\`\`\`env
MONGO_URI=your_mongodb_connection
SESSION_SECRET=your_session_secret
PORT=5000
CLIENT_URL=http://localhost:5000
\`\`\`

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

4. Visit \`http://localhost:5000\` in your browser.

---

## 💬 Chat Feature

- Socket.IO enables live chat between donor and recipient.
- Messages are exchanged in real time (stored optionally if persistent chat is implemented).
- Cursor.dev assisted in integrating this feature efficiently.

---

## 🛠️ Planned Improvements

- [ ] Convert to a **Progressive Web App (PWA)**  
- [ ] Add geolocation to match users by region  
- [ ] Store chat history  
- [ ] Implement notifications  
- [ ] Enable NGO registration and verification  

---

## 🤝 Acknowledgements

- Special thanks to [Cursor](https://www.cursor.sh/) for assisting in Socket.IO integration and development speed.
- Built with ❤️ for communities in need.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

