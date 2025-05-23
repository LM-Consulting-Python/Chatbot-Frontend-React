This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where empty lines have been removed, content has been formatted for parsing in markdown style.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Empty lines have been removed from all files
- Content has been formatted for parsing in markdown style
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
.repomix/bundles.json
meu-projeto-react/.gitignore
meu-projeto-react/eslint.config.js
meu-projeto-react/index.html
meu-projeto-react/package.json
meu-projeto-react/public/vite.svg
meu-projeto-react/README.md
meu-projeto-react/src/App.css
meu-projeto-react/src/App.jsx
meu-projeto-react/src/assets/imeddata-logo.svg
meu-projeto-react/src/assets/react.svg
meu-projeto-react/src/ChatPage.css
meu-projeto-react/src/ChatPage.jsx
meu-projeto-react/src/HomePage.jsx
meu-projeto-react/src/index.css
meu-projeto-react/src/main.jsx
meu-projeto-react/src/SendIcon.jsx
meu-projeto-react/vite.config.js
```

# Files

## File: .repomix/bundles.json
```json
{
  "bundles": {}
}
```

## File: meu-projeto-react/.gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## File: meu-projeto-react/eslint.config.js
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
```

## File: meu-projeto-react/README.md
```markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```

## File: meu-projeto-react/src/index.css
```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
h1 {
  font-size: 3.2em;
  line-height: 1.1;
}
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

## File: meu-projeto-react/src/SendIcon.jsx
```javascript
import React from "react";
const SendIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 2L11 13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
        fillOpacity="0.2"
      />
    </svg>
  );
};
export default SendIcon;
```

## File: meu-projeto-react/vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

## File: meu-projeto-react/public/vite.svg
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31.88" height="32" aria-hidden="true" class="iconify iconify--logos" preserveAspectRatio="xMidYMid meet" role="img" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"/><stop offset="100%" stop-color="#BD34FE"/></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"/><stop offset="8.333%" stop-color="#FFDD35"/><stop offset="100%" stop-color="#FFA800"/></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"/><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"/></svg>
```

## File: meu-projeto-react/src/assets/react.svg
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35.93" height="32" aria-hidden="true" class="iconify iconify--logos" preserveAspectRatio="xMidYMid meet" role="img" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"/></svg>
```

## File: meu-projeto-react/src/main.jsx
```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## File: meu-projeto-react/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <title>iMedDat@</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## File: meu-projeto-react/package.json
```json
{
  "name": "meu-projeto-react",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "particles.js": "^2.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.3.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.21.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^15.15.0",
    "vite": "^6.2.0"
  }
}
```

## File: meu-projeto-react/src/assets/imeddata-logo.svg
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="54" height="54" viewBox="0 0 54 54"><defs><filter id="Elipse_1" width="54" height="54" x="0" y="0" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur result="blur" stdDeviation="3"/><feFlood flood-opacity=".161"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter><clipPath id="clip-path"><rect id="Retângulo_13" width="26.821" height="27.282" fill="none" data-name="Retângulo 13"/></clipPath></defs><g id="Chat_avatar" transform="translate(9 6)"><g filter="url(#Elipse_1)" transform="matrix(1, 0, 0, 1, -9, -6)"><circle id="Elipse_1-2" cx="18" cy="18" r="18" fill="#fff" data-name="Elipse 1" transform="translate(9 6)"/></g><g id="Grupo_17" data-name="Grupo 17" transform="translate(4.55 4.55)"><g id="Grupo_14" data-name="Grupo 14" transform="translate(0 0)"><g id="Grupo_13" clip-path="url(#clip-path)" data-name="Grupo 13"><path id="Caminho_1" d="M27.471,5.074l4.158,4.178-1.322,1.316L26.149,6.39Z" data-name="Caminho 1" transform="translate(-18.018 -3.496)"/><path id="Caminho_2" fill="#bc8a69" d="M26.208,4.19a.93.93,0,0,1,.661.275l4.158,4.178A.933.933,0,0,1,29.7,9.958L25.547,5.781a.933.933,0,0,1,.661-1.591Z" data-name="Caminho 2" transform="translate(-17.416 -2.887)"/></g></g><path id="Caminho_3" d="M14.133,11.9l8.038,8.038-1.319,1.319-8.038-8.038Z" data-name="Caminho 3" transform="translate(-8.83 -8.199)"/><path id="Caminho_4" fill="#bba064" d="M12.868,11.02a.93.93,0,0,1,.66.273l8.038,8.038a.933.933,0,0,1-1.319,1.319l-8.038-8.038a.933.933,0,0,1,.66-1.592Z" data-name="Caminho 4" transform="translate(-8.224 -7.594)"/><g id="Grupo_16" data-name="Grupo 16" transform="translate(0 0)"><g id="Grupo_15" clip-path="url(#clip-path)" data-name="Grupo 15"><path id="Caminho_5" fill="#bc8a69" d="M17.55,34.754a6.558,6.558,0,0,1-3.091-.8c-1.792-.961-8.34-8.114-9.081-8.927A.933.933,0,0,1,6.757,23.77C9.472,26.748,14.2,31.7,15.341,32.31a3.945,3.945,0,0,0,4.693-.4A3.166,3.166,0,0,0,21.1,29.606c-.012-1.223-.785-2.585-2.3-4.047l.574-.742.653-.666c1.955,1.89,2.92,3.7,2.936,5.438a5,5,0,0,1-1.6,3.639A5.311,5.311,0,0,1,17.55,34.754Z" data-name="Caminho 5" transform="translate(-3.538 -16.17)"/><path id="Caminho_6" fill="#cf6a49" d="M11.025,48.9a.929.929,0,0,1-.375-.079,18.9,18.9,0,0,1-3.307-1.912A83.1,83.1,0,0,1,.575,40.128l-.324-.348a.933.933,0,0,1,1.363-1.273l.327.351c1.269,1.364,5.13,5.513,6.526,6.568A17.256,17.256,0,0,0,11.4,47.118a.933.933,0,0,1-.376,1.787Z" data-name="Caminho 6" transform="translate(0 -26.33)"/><path id="Caminho_7" fill="#a14c40" d="M14.339,67.248h0c-7.955,0-12.955-7.485-13.164-7.8A.933.933,0,0,1,2.732,58.42c.046.07,4.669,6.961,11.6,6.963h0c6.518,0,9.712-6.566,9.743-6.632a.933.933,0,1,1,1.685.8C25.618,59.866,22.022,67.248,14.339,67.248Z" data-name="Caminho 7" transform="translate(-0.703 -39.967)"/><path id="Caminho_8" fill="#a14c40" d="M66.319,17.582A.934.934,0,0,1,65.4,16.5a12.849,12.849,0,0,0-.872-6.531c-1.431-3.119-5.268-5.98-5.306-6.009a.933.933,0,1,1,1.109-1.5c.173.128,4.263,3.179,5.893,6.731A14.555,14.555,0,0,1,67.238,16.8.932.932,0,0,1,66.319,17.582Z" data-name="Caminho 8" transform="translate(-40.545 -1.57)"/><path id="Caminho_9" fill="#cf6a49" d="M42.118,22.677a.933.933,0,0,1-.267-1.827c4.436-1.325,5.513-3.9,5.981-6.235a8.179,8.179,0,0,0-1-5.729c-1-1.671-5.649-5.794-7.357-7.242A.933.933,0,1,1,40.684.221c.653.553,6.415,5.47,7.752,7.708a10.067,10.067,0,0,1,1.225,7.052c-.543,2.715-1.861,6.039-7.276,7.657A.933.933,0,0,1,42.118,22.677Z" data-name="Caminho 9" transform="translate(-26.976 0)"/></g></g></g></g></svg>
```

## File: meu-projeto-react/src/App.jsx
```javascript
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"; // Import HomePage instead of App
import ChatPage from "./ChatPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* Adicione outras rotas aqui conforme necessário */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
```

## File: meu-projeto-react/src/ChatPage.css
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
#root {
  height: 100%;
  width: 100%;
}
.chat-page {
  width: 100%;
  height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #e0e8ff 0%, #ffe0e8 100%);
}
.chat-container {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* Remove background color to show gradient */
  background-color: transparent;
}
.chat-header {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between logo and user profile */
  border-bottom: 1px solid #f0f0f0;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent header */
  flex-shrink: 0;
  height: 60px;
}
.logo-small {
  width: 36px;
  height: 36px;
  margin-right: 15px;
}
.logo-small img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.header-left {
  display: flex;
  align-items: center;
}
.header-right {
  display: flex;
  align-items: center;
}
.search-icon,
.notifications-icon {
  width: 24px;
  height: 24px;
  margin-right: 15px;
  cursor: pointer;
}
.user-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
}
.chat-header h1 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}
.chat-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  min-height: 0; /* Corrige overflow no Firefox */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.welcome-container {
  text-align: center;
  max-width: 600px;
  margin-bottom: 40px;
}
.welcome-logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
}
.welcome-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}
.welcome-text {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 40px;
}
.feature-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.feature-card {
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s;
}
.feature-card:hover {
  transform: translateY(-5px);
}
.feature-icon {
  width: 50px;
  height: 50px;
  background-color: #fff1f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}
.feature-icon.docs {
  background-color: #fff1f0;
}
.feature-icon.ai {
  background-color: #fff1f0;
}
.feature-icon.images {
  background-color: #fff1f0;
}
.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}
.feature-description {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}
.message {
  display: flex;
  margin-bottom: 20px;
  max-width: 90%;
}
.assistant-message {
  align-items: flex-start;
}
.user-message {
  flex-direction: row-reverse;
  margin-left: auto;
}
.avatar-container {
  width: 40px;
  height: 40px;
  margin-right: 15px;
  flex-shrink: 0;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f9f9f9;
}
.message-content {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 12px;
  border-top-left-radius: 0;
}
.user-content {
  background-color: #ff6b35;
  color: white;
  border-radius: 12px;
  border-top-right-radius: 0;
}
.message-content h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
}
.message-content p {
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  color: #666;
}
.user-content h2 {
  color: white;
  margin: 0;
}
.user-content p {
  color: rgba(255, 255, 255, 0.8);
}
.chat-input-container {
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  background-color: white;
  flex-shrink: 0;
  position: relative;
}
.input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 30px;
  background-color: #f9f9f9;
  padding: 5px 10px;
}
.chat-input {
  flex: 1;
  border: none;
  padding: 12px 15px;
  font-size: 14px;
  background-color: transparent;
  outline: none;
}
.input-actions {
  display: flex;
  align-items: center;
}
.attachment-icon {
  font-size: 20px;
  color: #999;
  margin-right: 10px;
  cursor: pointer;
}
.char-count {
  font-size: 12px;
  color: #999;
  margin-right: 10px;
}
.send-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ff6b35;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;
}
.send-button:hover {
  background-color: #ff5a1f;
}
.send-button:disabled {
  background-color: #ffb5a0;
  cursor: not-allowed;
}
.send-icon {
  width: 20px;
  height: 20px;
}
/* Sidebar styling */
.filtros-sidebar {
  width: 250px;
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  padding: 20px;
  border-right: 1px solid #f0f0f0;
}
.filtros-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}
.filtros-input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  background-color: #f9f9f9;
  color: #000; /* Added explicitly black text color */
  border-radius: 8px;
  margin-top: 8px;
  outline: none;
  font-size: 14px;
}
.filtros-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  display: block;
}
@media (max-width: 768px) {
  .filtros-sidebar {
    display: none;
  }
  .chat-container {
    border-radius: 0;
  }
  .feature-cards {
    flex-direction: column;
    align-items: center;
  }
}
/* Change to the part that controls the chat input text color */
.chat-input {
  flex: 1;
  border: none;
  padding: 12px 15px;
  font-size: 14px;
  background-color: transparent;
  outline: none;
  color: #000; /* Added explicitly black text color */
}
/* Also update the user message text color for consistency */
.user-content p {
  color: rgba(255, 255, 255, 0.8);
}
/* You may also want to ensure the placeholder text is visible */
.chat-input::placeholder {
  color: #999;
}
.chat-page {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.filter-section {
  margin-bottom: 20px;
}
.filtros-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}
.filtros-input,
.filtros-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
}
.input-with-button .filtros-input {
  flex: 1;
}
.filter-action-button {
  background-color: #ff6b35;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}
.filter-action-button:hover {
  background-color: #e55a2a;
}
.filter-action-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.user-info-section {
  background-color: #fff;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.user-info-name {
  font-weight: 600;
  color: #333;
  margin: 0;
}
```

## File: meu-projeto-react/src/HomePage.jsx
```javascript
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Mantenha os estilos existentes
import imedDataLogo from "./assets/imeddata-logo.svg";
import qrCodeImage from "./assets/qrcode.png";
function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    // Verificar se o objeto window.particlesJS existe
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 150,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: false,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    }
  }, []);
  const navigateToChat = () => {
    navigate("/chat");
  };
  return (
    <div className="app-container">
      <div className="background-image"></div>
      <div id="particles-js"></div>
      <div className="content-container">
        <div className="left-panel">
          <div className="logo-container">
            <img src={imedDataLogo} alt="iMedDat@ Logo" className="logo" />
            <span className="logo-text">iMedDat@</span>
            <div className="logo-subtitle">Segurança Digital</div>
          </div>
          <div className="access-section">
            <h1>Acessar Assistente Virtual</h1>
            <p>Use o app no navegador e compartilhe as suas informações</p>
            <div className="qr-container">
              <div className="qr-frame">
                <img src={qrCodeImage} alt="QR Code" className="qr-code" />
              </div>
            </div>
            <p className="scan-instructions">
              Escanei esse código com o seu celular
              <br />e acesse o assistente virtual do paciente
            </p>
            <button className="chat-button" onClick={navigateToChat}>
              Acessar Chat Agora
            </button>
          </div>
        </div>
        <div className="right-panel">
          <div className="instructions-container">
            <h2>Como conectar um dispositivo ao imedData</h2>
            <ol className="connection-steps">
              <li>
                <span className="step-number">1 -</span> Abra o{" "}
                <strong>imedData</strong> no seu celular.
              </li>
              <li>
                <span className="step-number">2 -</span> Toque em{" "}
                <strong>Mais opções</strong>.
              </li>
              <li>
                <span className="step-number">3 -</span> Selecione{" "}
                <strong>Dispositivos conectados</strong> e depois toque em{" "}
                <strong>Conectar dispositivo</strong>.
              </li>
              <li>
                <span className="step-number">4 -</span> Aponte a câmera do seu
                celular para a tela para escanear o <strong>QR Code</strong>.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
```

## File: meu-projeto-react/src/App.css
```css
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
:root {
  --primary-dark: #101c3d;
  --text-light: #ffffff;
  --accent-blue: #2c3e8c;
  --accent-red: #c92d2d;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
body,
html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.app-container {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.content-container {
  position: relative;
  z-index: 2;
  display: flex;
  width: 90%;
  max-width: 1200px;
  min-height: 500px;
  max-height: 85vh;
  background-color: rgba(
    255,
    255,
    255,
    0.1
  ); /* Fundo mais claro para contraste */
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin: auto;
}
.left-panel,
.right-panel {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.left-panel {
  flex: 1;
  background-color: rgba(16, 28, 61, 0.9); /* 90% opaco */
  backdrop-filter: blur(15px);
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2); /* Sombra interna */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borda sutil */
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  align-items: center;
  justify-content: space-around;
}
.left-panel::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3); /* Sombra interna intensa */
  pointer-events: none;
}
.right-panel {
  flex: 1;
  background-color: rgba(16, 28, 61, 0.1); /* 60% opaco */
  backdrop-filter: blur(10px);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1); /* Efeito de profundidade */
}
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.logo {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}
.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-light);
}
.logo-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}
.access-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}
.access-section h1 {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 15px;
}
.access-section p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  max-width: 300px;
}
.qr-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 15px 0;
}
.qr-frame {
  position: relative;
  width: 200px;
  height: 200px;
  background: white;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qr-frame::before {
  content: "";
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  pointer-events: none;
}
.qr-code {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.scan-instructions {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 20px;
}
.instructions-container {
  max-width: 500px;
}
.instructions-container h2 {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 30px;
  line-height: 1.2;
}
.connection-steps {
  list-style-type: none;
}
.connection-steps li {
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap; /* Add this */
  line-height: 1.5; /* Add this for better text spacing */
  word-break: normal;
  overflow-wrap: break-word;
}
.connection-steps li span:not(.step-number) {
  flex: 1;
  min-width: 0; /* Add this to allow proper text wrapping */
}
.connection-steps strong {
  color: var(--text-light);
  margin: 0 0.25em; /* Add small margin before and after strong elements */
}
.step-number {
  font-weight: 500;
  margin-right: 10px;
  color: rgba(255, 255, 255, 0.9);
  flex-shrink: 0; /* Add this to prevent the number from shrinking */
}
.connection-steps strong {
  color: var(--text-light);
}
@media (max-width: 900px) {
  .content-container {
    flex-direction: column;
    height: auto;
    min-height: unset;
    max-height: 95vh;
  }
  .access-section h1 {
    font-size: 24px;
  }
  .instructions-container h2 {
    font-size: 28px;
  }
  .left-panel,
  .right-panel {
    padding: 30px;
  }
}
.chat-button {
  margin-top: 15px;
  padding: 12px 24px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 300px;
}
.chat-button:hover {
  background-color: #0055aa;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.chat-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(./assets/background-rosto.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}
.left-panel,
.right-panel {
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
/* Ajuste final para responsividade vertical */
@media (max-height: 700px) {
  .content-container {
    max-height: 95vh;
    min-height: 450px;
  }
  .left-panel,
  .right-panel {
    padding: 25px;
  }
  .qr-frame {
    width: 160px;
    height: 160px;
  }
}
```

## File: meu-projeto-react/src/ChatPage.jsx
```javascript
import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.css";
import logoIcon from "./assets/imeddata-logo.svg";
import SendIcon from "./SendIcon";
// --- Icon Components ---
const AIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff6b35">
    <path d="M21 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H7L11 22V18H21C22.1 18 23 17.1 23 16V4C23 2.9 22.1 2 21 2ZM13 11H7V9H13V11ZM17 7H7V5H17V7Z" />
  </svg>
);
function ChatPage() {
  // Core chat state
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isConversationStarted, setIsConversationStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatContentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  // User state
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userLoaded, setUserLoaded] = useState(false);
  // API Endpoint Base URL
  const API_BASE_URL = "https://api.imeddata-4.com.br";
  // Handle message input change
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setCharCount(value.length);
  };
  // Helper function to add assistant messages to the chat
  const addAssistantMessage = (content, subtext = "") => {
    if (!isConversationStarted) {
      setIsConversationStarted(true);
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now() + Math.random(),
        sender: "assistant",
        content: content,
        subtext: subtext,
      },
    ]);
  };
  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    if (!userId && !userLoaded) {
      addAssistantMessage(
        "Por favor, informe seu ID de usuário antes de enviar mensagens."
      );
      return;
    }
    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      content: message,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setMessage("");
    setCharCount(0);
    setIsConversationStarted(true);
    setIsLoading(true);
    // Define API endpoint with userId
    const endpoint = `${API_BASE_URL}/ask2?userId=${userId}&message=${encodeURIComponent(
      message
    )}`;
    try {
      // Real API implementation
      const eventSource = new EventSource(endpoint);
      let accumulatedResponse = "";
      eventSource.onmessage = (event) => {
        if (event.data.trim() === "[DONE]") {
          eventSource.close();
          setIsLoading(false);
          return;
        }
        try {
          const parsedData = JSON.parse(event.data);
          const content = parsedData?.delta?.content;
          if (Array.isArray(content)) {
            // Acumula as partes de texto recebidas
            content.forEach((part) => {
              if (part.type === "text" && part.text.value) {
                accumulatedResponse += part.text.value;
              }
            });
            // Atualiza a última mensagem do assistente se ela já existir; caso contrário, cria uma nova
            setMessages((prevMessages) => {
              const lastMessage = prevMessages[prevMessages.length - 1];
              if (lastMessage && lastMessage.sender === "assistant") {
                // Atualiza o conteúdo da última mensagem do assistente
                return [
                  ...prevMessages.slice(0, prevMessages.length - 1),
                  { ...lastMessage, content: accumulatedResponse },
                ];
              } else {
                // Adiciona uma nova mensagem do assistente
                return [
                  ...prevMessages,
                  {
                    id: Date.now() + 1,
                    sender: "assistant",
                    content: accumulatedResponse,
                  },
                ];
              }
            });
          }
        } catch (error) {
          console.error(
            "Erro ao processar JSON:",
            error,
            "Event data:",
            event.data
          );
        }
      };
      eventSource.onerror = (error) => {
        console.error("Erro no streaming:", error);
        eventSource.close();
        addAssistantMessage(
          "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente."
        );
        setIsLoading(false);
      };
    } catch (error) {
      console.error("Erro:", error);
      addAssistantMessage(
        "Erro ao enviar mensagem. Por favor, verifique sua conexão e tente novamente."
      );
      setIsLoading(false);
    }
  };
  // Load user by ID
  const loadUser = async () => {
    if (!userId) {
      addAssistantMessage("Por favor, insira um ID de usuário.");
      return;
    }
    setIsLoading(true);
    addAssistantMessage(
      "Carregando informações do usuário...",
      `ID: ${userId}`
    );
    try {
      // Fetch user name
      const userResponse = await fetch(
        `${API_BASE_URL}/get-user-name?userId=${userId}`
      );
      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error("Usuário não encontrado. Verifique o ID digitado.");
        }
        throw new Error(
          `Erro ${userResponse.status} ao buscar nome do usuário.`
        );
      }
      const userData = await userResponse.json();
      if (userData.userName) {
        setUserName(userData.userName);
        setUserLoaded(true);
        setIsConversationStarted(true);
        addAssistantMessage(
          `Olá, ${userData.userName}! Como posso ajudar você hoje?`
        );
      } else {
        // If user exists but has no name
        setUserLoaded(true);
        setIsConversationStarted(true);
        addAssistantMessage("Olá! Como posso ajudar você hoje?");
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      addAssistantMessage(
        "Erro ao carregar informações do usuário.",
        error.message
      );
    } finally {
      setIsLoading(false);
    }
  };
  // Handle AI feature card click
  const handleAIFeature = () => {
    if (!userId) {
      setIsConversationStarted(true);
      addAssistantMessage(
        "Olá! Para começarmos, por favor digite seu ID de usuário."
      );
    } else if (!userLoaded) {
      loadUser();
    } else {
      setIsConversationStarted(true);
      addAssistantMessage(
        `Olá${userName ? ", " + userName : ""}! Como posso ajudar você hoje?`
      );
    }
  };
  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContentRef.current) {
      const timer = setTimeout(() => {
        if (chatContentRef.current) {
          chatContentRef.current.scrollTop =
            chatContentRef.current.scrollHeight;
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages]);
  return (
    <div className="chat-page">
      {/* User ID Sidebar */}
      <div className="filtros-sidebar">
        <h2 className="filtros-title">Identificação</h2>
        {/* User ID Input */}
        <div className="filter-section">
          <label htmlFor="userIdInput" className="filtros-label">
            Código do usuário
          </label>
          <div className="input-with-button">
            <input
              id="userIdInput"
              type="text"
              className="filtros-input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && userId && !isLoading) loadUser();
              }}
              placeholder="Digite o ID"
              aria-label="Código do usuário"
            />
            <button
              className="filter-action-button"
              onClick={loadUser}
              disabled={!userId || isLoading}
              aria-live="polite"
            >
              {isLoading && !userName ? "Carregando..." : "Carregar"}
            </button>
          </div>
        </div>
        {/* User Info Display */}
        {userLoaded && (
          <div className="user-info-section">
            <p className="user-info-name">Usuário: {userName || userId}</p>
          </div>
        )}
      </div>
      {/* Chat Area */}
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="header-left">
            <div className="logo-small">
              <img src={logoIcon} alt="iMedidata Logo" />
            </div>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <img
                src="https://via.placeholder.com/36/ff6b35/ffffff?text=BG"
                alt="Avatar do usuário"
                className="user-avatar"
              />
              <span>{userName || (userLoaded ? userId : "Usuário")}</span>
            </div>
          </div>
        </div>
        {/* Chat Content Area (Scrollable) */}
        <div className="chat-content" ref={chatContentRef}>
          {!isConversationStarted ? (
            <>
              {/* Welcome Screen */}
              <div className="welcome-container">
                <div className="welcome-logo">
                  <img src={logoIcon} alt="iMedidata Logo" />
                </div>
                <h1 className="welcome-title">Como posso te ajudar hoje?</h1>
                <p className="welcome-text">
                  Clique para começar uma conversa.
                </p>
              </div>
              {/* Feature Cards - Only AI chat feature */}
              <div className="feature-cards">
                <div
                  className="feature-card"
                  onClick={handleAIFeature}
                  role="button"
                  tabIndex={0}
                >
                  <div className="feature-icon ai">
                    <AIIcon />
                  </div>
                  <h3 className="feature-title">Assistente AI</h3>
                  <p className="feature-description">Conversar</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Render Chat Messages */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${
                    msg.sender === "user" ? "user-message" : "assistant-message"
                  }`}
                >
                  {msg.sender === "assistant" && (
                    <div className="avatar-container">
                      <img
                        src={logoIcon}
                        alt="Assistente Avatar"
                        className="avatar"
                      />
                    </div>
                  )}
                  <div
                    className={`message-content ${
                      msg.sender === "user" ? "user-content" : ""
                    }`}
                  >
                    <p className="message-main-text">{msg.content}</p>
                    {msg.subtext && (
                      <p className="message-sub-text">{msg.subtext}</p>
                    )}
                  </div>
                </div>
              ))}
              {/* Loading Indicator (Inside Chat) */}
              {isLoading && (
                <div className="message assistant-message">
                  <div className="avatar-container">
                    <img
                      src={logoIcon}
                      alt="Assistente Avatar"
                      className="avatar"
                    />
                  </div>
                  <div className="message-content loading-indicator">
                    <div className="loader"></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {/* Chat Input Area */}
        <div className="chat-input-container">
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Digite sua mensagem..."
                className="chat-input"
                maxLength={1000}
                disabled={isLoading}
                aria-label="Digite sua mensagem"
              />
              <div className="input-actions">
                <span className="char-count" aria-live="polite">
                  {charCount}/1000
                </span>
                <button
                  type="submit"
                  className="send-button"
                  disabled={message.trim() === "" || isLoading}
                  aria-label="Enviar mensagem"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ChatPage;
```
