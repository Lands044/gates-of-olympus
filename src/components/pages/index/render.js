import { imageUrl } from '@js/config/assets.js'

// textContent rather than innerText: these are plain labels, and innerText is
// rendering-dependent (it reads back empty inside a hidden element).
const setText = (selector, value) => {
	const element = document.querySelector(selector)
	if (element && typeof value === 'string') element.textContent = value
}

// For labels that carry <br> line breaks in the original markup.
const setHtml = (selector, value) => {
	const element = document.querySelector(selector)
	if (element && typeof value === 'string') element.innerHTML = value
}

const setImage = (selector, value, fallbackKey) => {
	const element = document.querySelector(selector)
	if (element) element.src = imageUrl(value, fallbackKey)
}

const setBackground = (selector, value, fallbackKey) => {
	const element = document.querySelector(selector)
	if (element) element.style.backgroundImage = `url('${imageUrl(value, fallbackKey)}')`
}

/**
 * Applies the parts of the config that are static DOM (art, labels, popup, CTA).
 * Anything tied to game state (balance, bet, double-chance toggle, spin results)
 * is read directly from `config` by the SlotMachine class in index.js, since it
 * drives its own re-renders on spin/bet-change.
 *
 * Safe to call repeatedly — this is the function the dev watcher re-runs on every
 * config.json edit.
 */
export function renderLanding(config) {
	const { texts, cta, assets, game } = config

	setImage('.game__logo img', assets.logo, 'logo')
	setImage('.game__mobile-logo img', assets.logoMobile, 'logo-mobile')
	setImage('.side-panel__poster img', assets.poster, 'zeus-poster')
	setBackground('.page', assets.background, 'bg')

	setText('.game__amount-label', texts.winLabel)

	setHtml('.side-panel__buy-label', texts.buyFreeSpins)
	setText('.side-panel__buy-price', texts.buyFreeSpinsPrice)
	setText('.side-panel__bet-label', texts.sideBetLabel)
	setText('.side-panel__bet-amount', `$${game.doubleChanceBet.toFixed(2)}`)
	setHtml('.side-panel__bet-desc', texts.doubleChance)

	setText('.menu__balance-row > span', texts.creditLabel)
	setText('.menu__bet-row > span', texts.betLabel)
	setText('.menu__title', texts.turboHint)
	setText('.menu__autoplay-label', texts.autoplay)

	setText('.popup__title', texts.popupTitle)
	setText('.popup__text', texts.popupText)
	setText('.cta-button', texts.ctaButton)

	const ctaButton = document.querySelector('.cta-button')
	if (ctaButton) {
		ctaButton.href = cta.url
		ctaButton.target = cta.target
	}
}
