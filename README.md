# Developing

First install dependencies with `npm install`, then start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

# Building

Build the application as a static site.

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

# Architecture

## Frameworks

The stack used for this project tend to be as minimal as possible. We use:

- SvelteKit to develop and build (internally use Svelte and Vite),
- Typescript as the programming language,
- Tailwind (JIT) as the CSS framework,
- svelte-material-icons to load material icons.

## Aliases

The following aliases are defined too ease the development experience:

- `icons/` is an alias to `svelte-material-icons/`,
- `atoms/` is an alias to `src/components/atoms/`,
- `molecules/` is an alias to `src/components/molecules/`,
- `organisms/` is an alias to `src/components/organisms/`,
- `routes/` is an alias to `src/routes/`.

Aliases must be declared in `svelte.config.js` (for resolving) and in `tsconfig.json` (for type checking).
