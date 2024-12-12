import {defineConfig} from 'vite';
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
    plugins: [handlebars()],
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
})