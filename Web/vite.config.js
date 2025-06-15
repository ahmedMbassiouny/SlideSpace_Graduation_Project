import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


export default defineConfig({
	plugins: [react()],
	server: {
    proxy: {
      '/api': 'http://localhost'
    },
		cors: true,
		headers: {
			'Cross-Origin-Embedder-Policy': 'credentialless',
      // 'Cross-Origin-Opener-Policy': 'same-origin',
		},
		allowedHosts: true,
	},
	resolve: {
		extensions: ['.jsx', '.js', '.tsx', '.ts', '.json', ],
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@Pages': path.resolve(__dirname, './src/pages'),
			'@Components': path.resolve(__dirname, './src/components/ui'),
		},
	},
});
