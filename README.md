# Rick & Morty Character Explorer

[![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular)](https://angular.io/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap)](https://getbootstrap.com/)

A responsive web application for exploring Rick and Morty characters using the [Rick and Morty API](https://rickandmortyapi.com/).

![Home Screenshot](![home image](src/app/assets/home_image.png))
![Character Details Screenshot](![character details image](src/app/assets/character_details_image.png))

## ✨ Features

- **Character Listing**
  - Dynamic search by name
  - Status filter (Alive/Dead/Unknown)
  - Responsive card grid layout
  - Pagination support

- **Character Details**
  - Detailed character information
  - Episode participation count
  - Origin and location details
  - Responsive image display

- **Optimizations**
  - API response caching
  - Debounced search input
  - Lazy loading of components
  - Efficient state management with Signals

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Angular CLI v19+
- Git

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/rick-morty-explorer.git

# Install dependencies
cd rick-morty-explorer
npm install

# Start development server
ng serve
