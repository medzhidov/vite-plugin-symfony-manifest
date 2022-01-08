import path from 'node:path';
import fs from 'node:fs';

/**
 * Генерируем манифест для симфони
 */
export function viteManifestPlugin() {
    const manifest = {};
    let config;
    let outputCount;

    return {
        name: 'vitePluginSymfonyManifest',

        configResolved(resolvedConfig) {
            // store the resolved config
            config = resolvedConfig
        },

        /*
        // use stored config in other hooks
        transform(code, id) {
            if (config.command === 'serve') {
                // dev: plugin invoked by dev server
            } else {
                // build: plugin invoked by Rollup
            }
        }*/

        buildStart() {
            outputCount = 0
        },

        generateBundle({ format }, bundle) {
            for (const file in bundle) {
                const chunk = bundle[file];
                const ext = path.extname(chunk.fileName);
                let chunkName = chunk.name;

                if (!chunk.name.includes('-legacy') && chunk.fileName.includes('-legacy')) {
                    chunkName += '-legacy';
                }

                if (chunk.type === 'chunk') {
                    manifest[chunkName + ext] = chunk.fileName;
                }
            }

            outputCount++
            const output = config.build.rollupOptions?.output
            const outputLength = Array.isArray(output) ? output.length : 1

            if (outputCount >= outputLength) {
                fs.writeFileSync('./public/manifest.json', JSON.stringify(manifest, null, 2));
            }
        }
    }
}
