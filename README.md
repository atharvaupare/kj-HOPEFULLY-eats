# Canteen Management System

## Overview
This is a full-stack canteen management system that allows users to browse menus, place orders, and receive real-time notifications, while the admin can manage orders and update the menu via a CMS. The system consists of three parts: the frontend, backend, and a CMS (Strapi) for content management.

## Features

### User Features
- Browse menu items with images
- View estimated preparation time  
- Place orders and generate QR code tokens for easy pickup
- Real-time notifications on order status
- Order history and user profile

### Admin Features
- Manage user orders
- Update order status, which triggers real-time notifications
- Manage stock availability 
- Add, edit, or delete menu items using Strapi CMS

## Tech Stack
- *Frontend*: React, Tailwind CSS
- *Backend*: Node.js, Express, MongoDB
- *CMS*: Strapi

## Installation

### Prerequisites
Make sure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Steps to run the project

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Run the frontend
 ``` bash
   cd frontend
   npm i
   npm run dev
```

3. Run the backend
``` bash
   cd backend
   npm i
   node server.js
```

4. Run the CMS
``` bash
   cd cms
   npm i
   npm run develop
```
