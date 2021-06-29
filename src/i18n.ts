import { _, addMessages, register, init, getLocaleFromNavigator } from "svelte-i18n"
import en from "locales/en.json"
import fr from "locales/fr.json"

addMessages("en", en)
addMessages("fr", fr)
// register("fr", () => import("./fr.json"))

console.log("Use langauge: en")
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
