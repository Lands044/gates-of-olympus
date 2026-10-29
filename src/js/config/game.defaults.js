import { DEFAULT_CONFIG as CORE_DEFAULTS } from '@js/config/defaults.js'

// Game-specific defaults for the Gates of Olympus slot machine, merged on top of
// the core shape (texts/cta/sound/dev). Structural values tied to the CSS grid
// (columns/rows/icon height per breakpoint, icon count, strip length) stay
// hardcoded in index.js — only values that don't affect layout are config-driven.
//
// Named game.defaults.js (not defaults.js) deliberately: the core kit already
// installs its own src/js/config/defaults.js at that exact path.
export const DEFAULT_CONFIG = {
	...CORE_DEFAULTS,

	game: {
		balance: 100000.00,
		bet: 2.00,
		betStep: 0.60,
		minBet: 0.60,
		maxBet: 48.00,

		// Added to the bet while the "Double chance" toggle is ON. Also shown as
		// the side panel's bet amount.
		doubleChanceBet: 2.50,

		// Scripted spin outcomes, in order. Each entry's `result` is a per-column
		// array of icon numbers (1-8) — the length of `result` must match the
		// game's column grid (6 columns x 5 rows desktop, 3x3 mobile), so the
		// layout itself is not config-driven, only which numbers/amounts appear.
		// winLine: the winning row index for each column (null = no line).
		spins: {
			desktop: [
				{
					type: 'loss',
					winAmount: 0,
					winLine: null,
					result: [
						[2, 4, 1, 7, 5],
						[3, 5, 2, 8, 1],
						[1, 7, 4, 3, 6],
						[6, 2, 5, 1, 4],
						[4, 1, 3, 6, 2],
						[6, 3, 1, 2, 7]
					]
				},
				{
					type: 'smallwin',
					winAmount: 50,
					winLine: [2, 2, 2, 2, 2, 2],
					result: [
						[1, 3, 3, 5, 2],
						[7, 5, 3, 8, 2],
						[4, 1, 3, 8, 6],
						[2, 6, 3, 4, 1],
						[5, 8, 3, 7, 4],
						[3, 6, 3, 1, 5]
					]
				},
				{
					type: 'bigwin',
					winAmount: 150,
					winLine: [1, 1, 2, 2, 3, 3],
					result: [
						[2, 8, 4, 7, 3],
						[5, 8, 2, 1, 6],
						[3, 4, 8, 4, 1],
						[1, 4, 8, 6, 2],
						[5, 3, 6, 8, 4],
						[2, 5, 1, 8, 7]
					]
				}
			],
			mobile: [
				{
					type: 'loss',
					winAmount: 0,
					winLine: null,
					result: [
						[4, 1, 7],
						[5, 2, 8],
						[7, 4, 3]
					]
				},
				{
					type: 'smallwin',
					winAmount: 50,
					winLine: [1, 1, 1],
					result: [
						[2, 3, 5],
						[7, 3, 2],
						[4, 3, 8]
					]
				},
				{
					type: 'bigwin',
					winAmount: 150,
					winLine: [2, 1, 0],
					result: [
						[1, 5, 8],
						[3, 8, 2],
						[8, 6, 4]
					]
				}
			]
		}
	},

	// actionButton/rotateNotice from CORE_DEFAULTS.texts are dropped — this game
	// has no single labelled action button and no rotate-to-portrait overlay, so
	// neither field is read anywhere (see docs/config.md, "No dead or hidden
	// fields"). Fields holding <br> are rendered as HTML.
	texts: (({ actionButton, rotateNotice, ...rest }) => ({
		...rest,
		popupTitle: "Congratulations!",
		popupText: "Ready to continue playing?",
		ctaButton: "Download Now",
		winLabel: "WIN",
		buyFreeSpins: "BUY<br>FREE SPINS",
		buyFreeSpinsPrice: "$200",
		sideBetLabel: "BET",
		doubleChance: "DOUBLE<br>CHANCE TO<br>WIN FEATURE",
		toggleOn: "ON",
		toggleOff: "OFF",
		creditLabel: "Credit",
		betLabel: "Bet",
		turboHint: "HOLD SPACE FOR TURBO SPIN",
		autoplay: "AUTOPLAY"
	}))(CORE_DEFAULTS.texts),

	cta: {
		...CORE_DEFAULTS.cta,
		// The original markup had href="#" — keep that until a real link is set.
		url: "#"
	},

	// zeus.gif is not configurable here: the core asset registry only globs
	// webp/png/jpg/jpeg/svg, so it stays hardcoded in index.html.
	assets: {
		logo: "logo",
		logoMobile: "logo-mobile",
		background: "bg",
		poster: "zeus-poster",
		sounds: {
			spin: "spin",
			win: "win",
			select: "select"
		}
	}
}
