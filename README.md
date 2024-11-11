
# User Management Application

This project is a user management application built using React and TypeScript with vite, allowing users to add, edit, and manage profiles. The app supports functionalities like profile photo upload, validation, local storage, and toast notifications.

![UserProfile](https://github.com/user-attachments/assets/e998f5a6-0f04-48a4-8e84-6f26418a756d)

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Build](#build)
- [Testing](#testing)
- [Known Limitations](#known-limitations)
---

## Features

- **Add User**: Create new user profiles with details such as name, email, role, and status. Upload profile photos with live preview.
- **Edit User**: Modify existing user information.
- **User List**: View user profiles in grid or table format.
- **Toast Notifications**: Success notifications for user creation and editing.
- **Persistent Data**: Stores user data in local storage.
- **Responsive Design**: Optimized for various screen sizes.
- **Accessible Elements**: Semantic HTML and labels ensure compatibility with accessibility tools.

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure Node.js is installed. You can download it from [Node.js official site](https://nodejs.org/).
2. **Yarn or npm**: Choose either Yarn or npm as your package manager.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Vicolas11/user-management-system.git
cd user-management-system
npm install
# Or, if using Yarn
yarn install
```

### Starting the Application

To run the app in development mode, execute:

```bash
npm start
# Or, if using Yarn
yarn start
```

The application will open at `http://localhost:5173`.

## Usage

- Navigate to `http://localhost:5173`.
- Use the **Add User** form to create new users.
- **Manage Users** to edit or delete profiles.
- Toggle between grid and table views on the homepage.

## Build

Run build using:
   ```bash
   npm run build
   # Or, if using Yarn
   yarn run build
   ```

## Testing

This project includes tests for UI elements and form submissions.

1. Run tests using:
   ```bash
   npm test
   # Or, if using Yarn
   yarn test
   ```
2. **Mocked modules** are used for testing dependencies like `toast` notifications.

## Known Limitations

- **Local Storage Limitations**: Data persists only in the browser. Clearing the browser cache will erase user data.
- **Accessibility**: Ensure all form elements and buttons are appropriately labeled.
- **No Backend Support**: The app is frontend-only and lacks backend data storage.
