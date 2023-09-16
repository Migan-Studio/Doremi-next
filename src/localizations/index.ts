import { Locale } from 'discord.js'
import english from './json/en.json'
import korean from './json/ko.json'

export function localzation(locale: Locale) {
  if (locale === Locale.Korean) {
    return korean
  } else {
    return english
  }
}

export { english, korean }
