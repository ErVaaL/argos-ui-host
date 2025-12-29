import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
	plugins: [
		federation({
			name: 'host',
			remotes: {
				remoteQuery: 'http://127.0.0.1:5174/assets/remoteEntry.js',
				remoteReport: 'http://127.0.0.1:5175/assets/remoteEntry.js'
			},
			shared: ['svelte']
		}),
		tailwindcss(),
		sveltekit()
	],
    build: { target: 'esnext' },
	server: {
		host: '127.0.0.1',
		port: 5173,
		strictPort: true
	}
});
