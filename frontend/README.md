# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment

This application is ready for static deployment after building with Vite.

### Local preview

- `npm install`
- `npm run build`
- `npm run preview`

### Environment variables

The frontend API client uses `VITE_API_BASE_URL` if provided, otherwise it calls `/api` by default.

Create a `.env` file in `frontend/notes-app` like this:

```env
VITE_API_BASE_URL=/api
```

### Static hosting

The Vite configuration is set up with relative asset paths, so the built `dist` folder can be hosted on static file hosts such as Netlify, Vercel, or GitHub Pages.

If you are using a host that supports Single Page App fallback, the `public/_redirects` file will route all requests to `index.html`.
