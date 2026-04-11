/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				cosmic: {
					bg: {
						deep: "#0c0513",
						start: "rgb(27,20,41)",
						end: "rgb(20,15,35)",
						surface: "rgba(27,26,46,0.663)",
						footer: "rgb(10,4,22)",
						"mobile-nav": "#181a27",
					},
					accent: {
						100: "#c084f5",
						200: "#c770f0",
						300: "#cd5ff8",
						400: "#be6adf",
						500: "#c95bf5",
						600: "#b562d6",
						700: "#be50f4",
						800: "#8a49a8",
						900: "#68187a",
						950: "#700c86",
					},
					btn: {
						primary: "#623686",
						"primary-hover": "rgba(109,32,197,0.843)",
						ghost: "rgba(147,76,206,0.369)",
						"ghost-hover": "rgba(162,77,211,0.525)",
					},
					text: {
						primary: "#ffffff",
						body: "whitesmoke",
						muted: "#a588c0",
						quote: "rgb(155,126,172)",
					},
				},
			},
			fontFamily: {
				mono: ['"PT Mono"', "monospace"],
			},
			boxShadow: {
				card: "0 4px 5px 3px rgba(119,53,136,0.459)",
				"card-hover": "0 4px 4px 5px rgba(129,72,144,0.561)",
				chip: "4px 5px 4px 3px rgba(89,4,168,0.137)",
				nav: "0px 10px 10px 0px rgba(9,5,29,0.171)",
				glow: "0 0 15px #801f95",
				"icon-hover": "0 0 5px #87209e",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
