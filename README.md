# Fujifilm Recipe Archive

A full-stack web application for browsing, submitting, and managing **Fujifilm film simulation recipes**, built with **React**, **TypeScript**, and **Vite**, and deployed on **Vercel**. Backend services include **MongoDB Atlas**, **Cloudinary**, and **Railway**. Designed for photographers to explore and contribute custom recipes efficiently.

## 🔍 Overview

- **Home Page** – Search recipes and display featured recipes.
- **Browsing Page** – Browse all recipes and navigate by pages.
- **Recipe View** – Clean, scrollable display of individual recipes with all parameters.
- **Submit Recipe** – Form for users to contribute new custom simulations.

---

## 🔗 Website Management

- Live Website [fujifilm-recipe-archive.vercel.app](https://fujifilm-recipe-archive.vercel.app)
- Frontend [Vercel](http://vercel.com/)
- Backend [Railway](https://railway.com/)
- Database [MongoDB](https://www.mongodb.com/)
- Image Storage [cloudinary](https://cloudinary.com/)

---

## 🗂️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Backend**: Railway-hosted Node server with MongoDB Atlas
- **API**: Postman, Fiber
- **Image Upload**: Cloudinary API
- **Deployment**: Vercel (frontend), Railway (backend)

---

## ✨ Key Features

- **Recipe Management**: Structured schema with all key Fujifilm settings (ISO, DR, WB, etc.)
- **Dynamic Rendering**: Recipes filtered and rendered based on camera model or tag
- **Image Handling**: Upload and manage recipe preview images via Cloudinary
- **Scalable Stack**: Modular, flexible, and optimized for future expansion

## API Workflow

```
[ User Browser ]
       |
       |--- POST /api/items (formData) ------------┐
       |                                             |
       |                                             ↓
[ Vercel Frontend ]                              [ Railway Backend (Fiber, Go) ]
       |                                             |
       |                                             |--- Authenticate user
       |                                             |--- Validate form data
       |                                             |--- Upload image to Cloudinary
       |                                             |--- Store recipe + image URL + metadata in MongoDB
       |                                             |--- Handle errors and send appropriate response
       |                                             ↓
       |                                             |--- Parallel operations:
       |                                             |       • Upload image to Cloudinary
       |                                             |       • Store recipe data + image URL metadata in MongoDB
       |                                             ↓                    ↓
       |                                         [ Cloudinary ]      [ MongoDB ]
       |
       |<------------ Response: success or error -----------|

```

## 📂 Project Structure

```
.
├── backend
│   ├── data
│   │   └── storage.json
│   ├── go.mod
│   ├── go.sum
│   ├── handler
│   │   └── items.go
│   ├── main.go
│   ├── middleware
│   │   ├── auth.go
│   │   ├── cors.go
│   │   ├── dbMiddleware.go
│   │   └── logging.go
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── images
│   ├── tmp
│   │   ├── build-errors.log
│   │   └── main
│   ├── types
│   │   └── recipe.go
│   └── utils
│       └── fileUtils.go
├── client
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── images
│   │   └── logo.svg
│   ├── src
│   │   ├── App.tsx
│   │   ├── assets
│   │   ├── components
│   │   ├── config.ts
│   │   ├── data
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── main.tsx
│   │   ├── pages
│   │   ├── styles
│   │   ├── types
│   │   ├── utils
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tailwind.config.mjs
│   ├── tmp
│   │   └── build-errors.log
│   ├── tsconfig.json
│   └── vite.config.ts
├── LICENSE
└── README.md
```

## 🗓️ Timeline

### Project Development Milestones

➜ **Design from Scratch**
Created initial UI/UX concepts and wireframes to establish project direction.

➜ **Frontend Design**
Implemented visual components and responsive layouts aligned with design goals.

➜ **Backend Local Testing & Storage**
Developed and tested API endpoints locally, including data storage mechanisms.

➜ **API Testing via Postman**
Validated API functionality and response correctness with comprehensive test cases.

➜ **Database Integration & MongoDB Testing**
Connected backend to MongoDB Atlas, performed CRUD operations, and ensured data integrity.

➜ **Development Completion**
Finalized feature implementation, bug fixes, and code optimizations for production readiness.

➜ **Image Hosting Setup on Cloudinary**
Configured Cloudinary for scalable image storage and delivery.

➜ **Frontend Deployment on Vercel**
Deployed React frontend with continuous integration and environment setup.

➜ **Backend Deployment on Railway**
Deployed backend services with production configurations and monitoring.

➜ **Full-Stack Integration**
Established seamless communication between frontend, backend, database, and cloud storage for a complete system.

## 📜 License

Licensed under the [MIT License](LICENSE).
