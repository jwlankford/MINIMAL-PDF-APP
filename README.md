# Minimal PDF App

This is a simple Vue 3 application that generates PDF letters based on user input.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/jwlankford/MINIMAL-PDF-APP.git](https://github.com/jwlankford/MINIMAL-PDF-APP.git)
    cd MINIMAL-PDF-APP
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    or if you're using pnpm:

    ```bash
    pnpm install
    ```

## Usage

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

    or if you are using pnpm:

    ```bash
    pnpm run dev
    ```

2.  **Open the application in your browser:**

    * The application will be available at `http://localhost:5173/` (or a similar address).

3.  **Fill out the form:**

    * Enter the recipient's first name, last name, address, city, state, and zip code.
    * Select a template from the dropdown menu.

4.  **Generate the PDF:**

    * Click the "Generate PDF" button.
    * The generated PDF will be displayed in the preview area.
    * You can download the PDF by clicking the "Download PDF" link.

## Testing

1.  **Run the unit tests:**

    ```bash
    npm run test
    ```

    or if you are using pnpm:

    ```bash
    pnpm run test
    ```

## Project Structure

**Key Directories and Files Explained:**

* **`public/`**:
    * This directory contains static assets that are served directly by Vite.
    * `favicon.ico` is the application's icon displayed in the browser tab.
* **`src/`**:
    * This is the core directory containing all the application's source code.
    * **`components/`**:
        * Holds reusable Vue components. In this project, `FirstNameInput.vue` is a custom input field component.
    * **`tests/`**:
        * Contains unit tests for Vue components. `App.test.js` tests the `App.vue` component.
    * **`App.vue`**:
        * The main application component that orchestrates the UI and functionality.
    * **`App.css`**:
        * Global CSS styles for the application.
    * **`main.js`**:
        * The entry point of the Vue 3 application, where the Vue instance is created and mounted.
    * **`assets/`**:
        * Stores static assets like images and icons.
* **`index.html`**:
    * The main HTML file that serves as the entry point for the application.
* **`package.json`**:
    * Contains project metadata, dependencies, and scripts.
* **`package-lock.json` / `pnpm-lock.yaml`**:
    * Lockfiles that ensure consistent dependency versions across installations.
* **`README.md`**:
    * Provides project documentation, including installation and usage instructions.
* **`vitest.config.js`**:
    * This file contains the configuration for the vitest testing framework.

This structure helps to organize the project, making it easier to navigate, maintain, and scale.
