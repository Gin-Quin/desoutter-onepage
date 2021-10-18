import { _, addMessages, init } from "svelte-i18n"
import en from "locales/en.json"
// import fr from "locales/fr.json"

addMessages("en", en)
// addMessages("fr", fr)
// register("fr", () => import("locales/fr.json"))

init({
	fallbackLocale: "en",
	initialLocale: "en",
	// initialLocale: getLocaleFromNavigator(),
})
// init({
// 	fallbackLocale: "en",
// 	initialLocale: "fr",
// })

export default _
