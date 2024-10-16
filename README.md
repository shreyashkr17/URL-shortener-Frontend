![image](https://github.com/user-attachments/assets/6ae70591-a096-4c11-9acf-f181e16b4966)

# URL Shortener Client-Side Documentation

## Overview

This project is a URL shortener web application built with React and TypeScript. The application allows users to shorten long URLs through a form and displays the shortened URL. The project utilizes various modern web technologies and libraries such as **Vite**, **Tailwind CSS**, **NextUI**, and **React Router DOM**.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [File Structure](#file-structure)
3. [Components Overview](#components-overview)
   - [Header](#header)
   - [Footer](#footer)
   - [UrlForm](#urlform)
   - [UrlResult](#urlresult)
4. [Pages](#pages)
   - [Home](#home)
   - [NotFound](#notfound)
5. [API Integration](#api-integration)

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript, providing type safety.
- **Vite**: Next-generation front-end tool that provides a faster and leaner development experience for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework for creating custom designs.
- **NextUI**: A beautiful, modern React UI library.
- **React Router DOM**: Library for routing in React applications.
- **GSAP**: Animation library for creating high-performance animations.

## File Structure

- `src/`
  - `components/`: Contains reusable components such as `Header.tsx`, `Footer.tsx`, `UrlForm.tsx`, and `UrlResult.tsx`.
  - `pages/`: Contains the main application pages like `Home.tsx` and `NotFound.tsx`.
  - `services/`: Contains API interaction logic (`api.ts`).
  - `styles/`: Contains the global styles.
  - `App.tsx`: Main application component that renders routes and content.
  - `Main.tsx`: Entry point that renders the application to the DOM.

## Components Overview

### Header

The `Header.tsx` component is a simple navigation bar created using the `NextUI` library. It contains a link to the GitHub repository of the project.

### Footer

The `Footer.tsx` component is a basic footer that displays copyright information.

### UrlForm

The `UrlForm.tsx` component handles the URL shortening form. It accepts user input (a URL), submits the data to the backend, and triggers the URL shortening process.

### UrlResult

The `UrlResult.tsx` component displays the shortened URL after the `UrlForm` submission is successful.

## Pages

### Home

The `Home.tsx` component serves as the main landing page. It contains the form for submitting URLs to be shortened and displays results or error messages based on the submission.

### NotFound

The `NotFound.tsx` page handles any undefined routes by displaying a simple 404 error message with a link to return to the home page.

## API Integration

The project uses a custom backend API hosted at `https://njs.shortlycut.xyz`. The `shortenUrl` function in `api.ts` handles sending the URL data to the backend. It makes a POST request with the original URL and receives the shortened URL in response.

The `shortenUrl` function is asynchronous and returns a promise that resolves to the shortened URL. Error handling is included to manage cases where the URL shortening request fails.
