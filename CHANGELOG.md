# Changelog (Angular)

All notable changes to the **Angular frontend** of this repository are documented in this file.  
Format loosely follows [Keep a Changelog](https://keepachangelog.com/) and SemVer.

## [1.0.0] - 2025-09-29
### Added
- **HTTP client & configuration**
  - Enabled `provideHttpClient()` in `src/app/app.config.ts`.
  - Configured `HashLocationStrategy` via `LocationStrategy` in `app.config.ts` to use hash-based routing.
  - Imported `zone.js` in `src/main.ts` (required when not using zoneless).
- **Service layer**
  - New service `src/app/services/imagen.service.ts` with:
    - Interface `Imagen`.
    - `getImagenes()` and `uploadImagen()` methods for the Laravel API (`http://homestead.test/api/v1`).
    - URL normalization to absolute URLs (prefixes `/storage/...` with `http://homestead.test`).
- **Routing**
  - Lazy route for admin in `src/app/app.routes.ts`:  
    `{ path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes) }`
  - Public lazy route for imágenes:  
    `{ path: 'imagenes', loadComponent: () => import('./app/imagenes/imagenes').then(c => c.ImagenesComponent) }`
- **Admin area (standalone)**
  - `src/app/admin/admin.routes.ts` with child routes: `''` → `AdminComponent`, `'imagenes'` → `AdminListaImagenesComponent`, `'imagenes/crear'` → `AdminCrearImagenComponent`.
  - `src/app/admin/admin.ts` & `admin.html`: shell with `<router-outlet>`.
  - `src/app/admin/admin-lista-imagenes/`: list with **thumbnails**, title and **Edit/Delete** buttons; `trackBy` and image fallback.
  - `src/app/admin/admin-crear-imagen/`: template-driven **form validations** (2 per field), image type check, **disabled Create** button when invalid, on success logs *“La imagen ha sido agregada correctamente”* and navigates to `/admin/imagenes`.

### Changed
- `admin-lista-imagenes.html`: loading/empty states; uses `img.miniatura || img.ruta`; fallback image.
- `app.routes.ts`: incorporated admin lazy-loading.
- `app.config.ts`: simplified to avoid platform conflicts (removed zoneless & hydration here).

### Fixed
- **NG0400** platform configuration conflict → unified client config (no zoneless/hydration).
- **NG0908** missing Zone.js → added `import 'zone.js'` in `main.ts`.

### Developer Experience
- Optional `proxy.conf.json` for dev to avoid CORS:
  ```json
  {
    "/api": {
      "target": "http://homestead.test",
      "secure": false,
      "changeOrigin": true
    }
  }
  ```
  Run with: `ng serve --proxy-config proxy.conf.json`.
  If proxy is used, the `ImagenService` can call `'/api/v1'` instead of `http://homestead.test/api/v1`.

> Note: This changelog tracks **frontend** changes only.
