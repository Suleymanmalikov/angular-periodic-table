# Periodic Table App

## Overview

The Periodic Table App is a web application that displays a periodic table with features for filtering, editing, and managing elements. Built using Angular and Angular Material, this application offers a user-friendly interface for interacting with periodic elements.

## Features

- **Filter Elements**: Filter elements by name, weight, and symbol.
- **Edit Elements**: Open a dialog to edit element details such as name, weight, and symbol.
- **Responsive Design**: The application is designed to be responsive and works well on various screen sizes.
- **Loading State**: A loading spinner is shown while data is being fetched or filtered.

## Technologies Used

- Angular
- Angular Material
- RxJS
- CSS Flexbox/Grid

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Suleymanmalikov/angular-periodic-table.git
   ```

````

2. **Navigate to the Project Directory**

   ```bash
   cd periodic-table-app
   ```

3. **Install Dependencies**

   Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:

   ```bash
   npm install
   ```

## Running the Application

To run the application in development mode, use:

```bash
ng serve
```

This will start the development server and you can view the application at `http://localhost:4200/`.

## Building for Production

To build the application for production, use:

```bash
ng build --prod
```

The output will be placed in the `dist/` directory.

## Project Structure

- **src/app**: Contains Angular components, services, and models.
  - **components/**: Contains reusable Angular components.
    - `app.component.ts`: Main application component.
    - `periodic-table.component.ts`: Component displaying the periodic table.
    - `edit-dialog.component.ts`: Dialog component for editing elements.
  - **services/**: Contains services for data handling.
    - `element-data.service.ts`: Service for fetching and updating element data.
  - **models/**: Contains TypeScript interfaces and models.
    - `periodic-element.ts`: Interface representing a periodic element.
  - **app.component.html**: Template for the main application component.
  - **periodic-table.component.html**: Template for the periodic table component.
  - **edit-dialog.component.html**: Template for the edit dialog component.
  - **app.component.css**: Styles for the main application component.
  - **periodic-table.component.css**: Styles for the periodic table component.
  - **edit-dialog.component.css**: Styles for the edit dialog component.

````
