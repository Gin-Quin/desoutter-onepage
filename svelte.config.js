import preprocess from "svelte-preprocess"
import { dirname } from "path"
import { fileURLToPath } from "url"
import toStatic from "@sveltejs/adapter-static"

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",
		adapter: toStatic(),
		vite: {
			resolve: {
				alias: {
					icons: `svelte-material-icons`,
					atoms: `${__dirname}/src/components/atoms`,
					molecules: `${__dirname}/src/components/molecules`,
					organisms: `${__dirname}/src/components/organisms`,
					sections: `${__dirname}/src/components/sections`,
					routes: `${__dirname}/src/routes`,
					utilities: `${__dirname}/src/utilities`,
					types: `${__dirname}/src/types`,
					src: `${__dirname}/src`,
					style: `${__dirname}/src/style`,
					locales: `${__dirname}/src/locales`,
					config: `${__dirname}/src/config`,
				},
			},
		},
	},
}

export default config
