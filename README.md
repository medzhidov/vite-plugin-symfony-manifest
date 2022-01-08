# vite-plugin-symfony-manifest

Vite plugin to create manifest with symfony-like notation

## How to use

Add plugin in your vite.config.js

``` javascript
defineConfig({
    ...
    plugins: [
        // In the end of plugins list
        viteManifestPlugin(),
    ]
    ...
});
```

It will generates create `manifest.json` in `./public/` directory with code like this:

``` json
{
  "app-legacy.js": "assets/app-legacy.5fe5dd78.js",
  "vendor-legacy.js": "assets/vendor-legacy.e0ef16e1.js",
  "polyfills-legacy.js": "assets/polyfills-legacy.2bdaf390.js",
  "app.js": "assets/app.3df486a9.js",
  "vendor.js": "assets/vendor.d9b934c7.js"
}
```
