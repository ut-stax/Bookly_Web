# 📚 Bookly - Your Personal Digital Library

Bookly is a modern, user-friendly web application that serves as your personal digital library. Discover, explore, and download books across multiple genres and languages. Built with React, Firebase, and Tailwind CSS for a seamless reading experience.

## ✨ Features

- **🔐 User Authentication**: Secure login and registration with Firebase Auth
- **📖 Book Discovery**: Browse a curated collection of books with detailed information
- **🔍 Advanced Search & Filters**: Find books by title, author, genre, or language
- **📤 Book Upload**: Protected admin upload system for adding new books
- **📩 Book Requests**: Request books you want to read
- **💬 Feedback System**: Share your thoughts and suggestions
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **⏰ Auto Logout**: Security feature that logs out users after 15 minutes of inactivity
- **🎨 Modern UI**: Beautiful interface with Tailwind CSS styling

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bookly.git
   cd bookly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore
   - Copy your Firebase config to `src/firebase.js`

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
bookly/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── assets/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── BooksPage.jsx
│   │   ├── BookDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ProtectedUpload.jsx
│   │   ├── RequestBook.jsx
│   │   ├── Feedback.jsx
│   │   └── Landing.jsx
│   ├── App.js
│   ├── index.js
│   ├── firebase.js
│   └── index.css
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router DOM
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore)
- **Build Tool**: Create React App
- **Deployment**: Firebase Hosting

## 📱 Usage

### For Users:
1. **Register/Login**: Create an account or sign in
2. **Browse Books**: Explore the collection on the home page
3. **Search & Filter**: Use the search bar and filters on the Books page
4. **View Details**: Click on any book to see full details and download
5. **Request Books**: Submit requests for books you'd like to see added
6. **Give Feedback**: Share your thoughts to help improve the platform

### For Admins:
1. **Upload Books**: Access the protected upload page at `/secret-upload`
2. **Manage Content**: Add new books with cover images and download links

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## 🚀 Deployment

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Utkarsh Tripathi** - [Your GitHub Profile](https://github.com/ut-stax)

---

Made with ❤️ and 📚 by Utkarsh Tripathi
