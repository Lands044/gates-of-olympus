import { DEFAULT_CONFIG } from '@js/config/game.defaults.js'

// Game-specific devmenu field groups, concatenated with CORE_FIELDS (texts/CTA/
// sound) in index.js. See src/js/config/devmenu.js in the core kit for the field
// shape ({ path, label, type, min/max/step, hint }).
//
// Only type/winAmount are editable per spin — result/winLine are per-column icon
// grids tied to the fixed desktop/mobile layouts (CSS-dependent), so they stay
// config.json-only. Field count is derived from DEFAULT_CONFIG.game.spins so the
// panel always matches the number of scripted spins.
const spinFields = (breakpoint) => DEFAULT_CONFIG.game.spins[breakpoint].map((spin, i) => [
	{ path: `game.spins.${breakpoint}.${i}.type`, label: `Спін #${i + 1}: тип`, type: 'text',
		hint: i === 0 ? 'loss / smallwin / bigwin' : undefined },
	{ path: `game.spins.${breakpoint}.${i}.winAmount`, label: `Спін #${i + 1}: сума виграшу`, type: 'number', min: 0, step: 1 }
]).flat()

// buyFreeSpins/doubleChance hold <br> line breaks, rendered as HTML.
export const GAME_FIELDS = [
	['Ставки', [
		{ path: 'game.balance', label: 'Баланс', type: 'number', min: 0, step: 1 },
		{ path: 'game.bet', label: 'Ставка', type: 'number', min: 0, step: 0.1 },
		{ path: 'game.betStep', label: 'Крок ставки', type: 'number', min: 0.1, step: 0.1 },
		{ path: 'game.minBet', label: 'Мін. ставка', type: 'number', min: 0, step: 0.1 },
		{ path: 'game.maxBet', label: 'Макс. ставка', type: 'number', min: 0, step: 0.1 },
		{ path: 'game.doubleChanceBet', label: 'Double chance (+ставка)', type: 'number', min: 0, step: 0.1 }
	]],
	['Спіни — Desktop', spinFields('desktop')],
	['Спіни — Mobile', spinFields('mobile')],
	['Тексти гри', [
		{ path: 'texts.winLabel', label: 'Борд виграшу', type: 'text' },
		{ path: 'texts.buyFreeSpins', label: 'Buy free spins', type: 'text', hint: '<br> — перенос рядка' },
		{ path: 'texts.buyFreeSpinsPrice', label: 'Ціна free spins', type: 'text' },
		{ path: 'texts.sideBetLabel', label: 'Бокова панель: BET', type: 'text' },
		{ path: 'texts.doubleChance', label: 'Double chance', type: 'text', hint: '<br> — перенос рядка' },
		{ path: 'texts.toggleOn', label: 'Перемикач: ON', type: 'text' },
		{ path: 'texts.toggleOff', label: 'Перемикач: OFF', type: 'text' },
		{ path: 'texts.creditLabel', label: 'Меню: Credit', type: 'text' },
		{ path: 'texts.betLabel', label: 'Меню: Bet', type: 'text' },
		{ path: 'texts.turboHint', label: 'Підказка turbo', type: 'text' },
		{ path: 'texts.autoplay', label: 'Autoplay', type: 'text' }
	]]
]
