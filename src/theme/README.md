# Contributing a Theme

The standalone [ampdresume-theme](https://github.com/mission-minded-llc/ampdresume-theme) repository
is archived. New themes belong in this repo under `src/theme/`. Open a pull request against
[ampdresume](https://github.com/mission-minded-llc/ampdresume) using the process in
[CONTRIBUTING.md](../../CONTRIBUTING.md).

Use the existing `default` and `davids` themes as references.

## Folder layout

```
src/theme/
├── index.ts                 # Register web themes in themeDefinitions
├── pdfThemes.ts             # Register PDF views independently of web themes
├── components/              # Shared sections any theme can reuse
├── sampleData.ts            # Default theme demo data
├── <theme-slug>/
│   ├── Theme<Name>.tsx      # Web resume view
│   ├── Theme<Name>.test.tsx
│   ├── sampleData.ts        # Optional theme-specific demo data
│   ├── sampleData.json
│   └── components/          # Theme-specific UI
```

The theme slug is lowercase with dashes (`my-theme`). It is the `ThemeName` value, the folder name,
and the `/demo/<slug>` URL.

## Theme contract

A web theme is a React component that receives resume data and the site appearance. The parent Amp'd
Resume app owns the light/dark toggle — do not add a second one or ignore `themeAppearance`.

Required props (see `ThemeDefinition` in `src/types/index.ts`):

- `themeAppearance` — `"light"` or `"dark"`
- `user`
- `socials`
- `skillsForUser`
- `companies`
- `education`
- `certifications`
- `featuredProjects`

PDF views are independent from web themes. Do not attach a PDF component to a `themeDefinitions`
entry. Register print layouts in `src/theme/pdfThemes.ts` and add the slug to `PdfThemeName`. Resume
owners pick a PDF view separately from the interactive web theme; visitors see that stored
selection. Unknown or missing PDF names fall back to Classic.

Reuse shared sections from [`components/`](./components/) when they fit. Put unique layout or
styling in your theme folder.

## Register the theme

Wire the slug in every place the app looks up themes:

1. **`src/types/index.ts`** — add the slug to the `ThemeName` union.

2. **`src/theme/index.ts`** — export the component and add a `themeDefinitions` entry:

   ```ts
   "my-theme": {
     name: "My Theme",
     published: false,
     webComponent: ThemeMyTheme,
     description: "A short description shown in the UI and SEO tags.",
     iconifyIcon: "fluent-emoji-flat:artist-palette",
     authors: [{ name: "Your Name", gitHubUrl: "https://github.com/you" }],
   },
   ```

   Keep `published: false` until maintainers are ready to offer it in production. Unpublished themes
   still appear on `/demo/<slug>`. On production they stay hidden in the resume theme picker unless
   a `theme-preview` cookie is set.

3. **`src/app/demo/[themeName]/ResumeView.tsx`** — add a `switch` case that renders your component
   with sample data. Live resumes at `/r/[slug]` read `webComponent` from `themeDefinitions`; the
   demo page does not, so this case is required.

Demo pages pick up the new slug automatically in the nav under **Demo Themes**. Preview at
`http://localhost:3000/demo/<theme-slug>` after `npm run dev`.

To add a PDF view, register it in `pdfThemeDefinitions` instead of nesting it under a web theme.
Owners can then select it from **PDF Theme** on `/r/<slug>/pdf`.

## Sample data

Copy `src/theme/sampleData.json` (or another theme's sample file) into your theme folder and export
it from `sampleData.ts` as a `Response`. The JSON shape matches the `getResume` GraphQL response.

## Tests

Add a Jest test next to the theme component that renders the main sections with sample data. Follow
`default/ThemeDefault.test.tsx` or `davids/ThemeDavids.test.tsx`. Cypress coverage under
`cypress/integration/theme/` is welcome for interactive behavior.

Before opening a PR:

```bash
npm run check
```

That runs type-check, lint, Prettier, and Jest. Sign the CLA described in
[CONTRIBUTING.md](../../CONTRIBUTING.md) so the PR can be merged.
