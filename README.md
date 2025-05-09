# Admin Dashboard

A modern admin dashboard built with Next.js 14, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for managing customer data, including subscription plans, onboarding progress, and account status.

## Features

- 📊 Customer list with search and pagination
- 🔍 Advanced filtering by plan and status
- 📱 Responsive design for all devices
- 🎨 Modern UI with smooth animations
- ♿ Accessibility features
- 🔄 Real-time updates
- 📝 Detailed customer information in slide-in drawer
- ⚡ Optimistic UI updates

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **State Management**: React Hooks
- **Data Storage**: Local JSON file (simulated API)

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd admin-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Implementation Details

### Core Features

1. **Customer List Page**
   - Paginated table with 10 items per page
   - Search functionality for name and email
   - Filtering by plan (Basic, Pro, Enterprise) and status (active, inactive)
   - Responsive design with mobile-first approach
   - Loading states and error handling

2. **Customer Detail Drawer**
   - Slide-in panel with backdrop blur
   - Three tabs: Profile, Subscription, and Onboarding
   - Real-time updates with optimistic UI
   - Smooth animations and transitions

3. **Data Mutations**
   - API endpoints for updating customer data
   - Optimistic updates for better UX
   - Error handling and rollback on failure

### Trade-offs and Decisions

1. **Local JSON Storage**
   - Used a local JSON file instead of a real database for simplicity
   - Simulated API endpoints for data operations
   - Trade-off: Not production-ready but good for demonstration

2. **State Management**
   - Used React's built-in state management instead of external libraries
   - Trade-off: Simpler implementation but might need refactoring for larger applications

3. **UI Components**
   - Custom implementation of filters and drawer
   - Trade-off: More control over styling but more maintenance required

4. **Pagination**
   - Client-side pagination for better performance
   - Trade-off: Not suitable for very large datasets

## Future Improvements

1. **Authentication & Authorization**
   - Add user authentication
   - Implement role-based access control
   - Secure API endpoints

2. **Data Management**
   - Implement a proper database (e.g., PostgreSQL)
   - Add data validation and sanitization
   - Implement server-side pagination

3. **UI/UX Enhancements**
   - Add more interactive features
   - Implement drag-and-drop functionality
   - Add data visualization charts
   - Improve mobile responsiveness

4. **Performance**
   - Implement data caching
   - Add request debouncing
   - Optimize bundle size
   - Add service worker for offline support

5. **Testing**
   - Add unit tests
   - Implement integration tests
   - Add end-to-end testing
   - Set up CI/CD pipeline

6. **Additional Features**
   - Export data functionality
   - Bulk actions
   - Advanced filtering options
   - Activity logs
   - User preferences