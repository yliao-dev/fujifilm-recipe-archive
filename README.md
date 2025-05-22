# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Fujifilm Recipe Archive
Fujifilm Recipes Collection
Focus: Full-stack web app

Considering a severless solution instead of backend
erverless architecture e.g., Vercel functions + Cloudinary + MongoDB Atlas

```
[ User Browser ]
     |
     |--- fetch POST /api/recipes (formData) ----------┐
     |                                                 |
     |                                                 ↓
[ Vercel Frontend ]                              [ Backend (Fiber, Go) ]
     |                                                 |
     |                                                 |--- Upload image to Cloudflare R2
     |                                                 |--- Store image URL + metadata in MongoDB
     |                                                 ↓
     |                                          [ Cloudflare R2 (images) ]
     |                                                 |
     |                                          [ MongoDB (recipe + image URL) ]

```
