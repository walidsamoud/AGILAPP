import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const defaultLocale = 'en'

export const locales = [
    {
        code: 'en',
        name: 'English',
        dir: 'ltr',
    },
    {
        code: 'fr',
        name: 'Français',
        dir: 'ltr',
    },
    {
        code: 'ar',
        name: 'العربية',
        dir: 'rtl',
    }
]

export default new VueI18n({
	locale: localStorage.getItem('Language') ? localStorage.getItem('Language') : 'fr', // set default locale
	fallbackLocale: 'fr',
	silentTranslationWarn: true,
	messages: {
		en: require('../locales/en.json'),
		fr: require('../locales/fr.json'),
		ar: require('../locales/ar.json'),
	}
})
