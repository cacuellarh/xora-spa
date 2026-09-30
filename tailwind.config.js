/** @type {import('tailwindcss').Config} */
// Los colores y las fuentes salen de las variables de src/styles.css, y los tamaños de texto
// de la escala de @c-code/c-code-fw/ui (tokens.css). Así el sitio y los componentes comparten
// la misma paleta y el mismo ritmo tipográfico. El espaciado de Tailwind (múltiplos de 4px)
// ya coincide con --cc-space-*.
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--xora-teal)',
        primary_light: 'var(--xora-teal-light)',
        primary_dark: 'var(--xora-teal-dark)',
        primary_darker: 'var(--xora-teal-darker)',
        mist: 'var(--xora-teal-mist)',
        secondary: 'var(--xora-pink)',
        secondary_dark: 'var(--xora-rose)',
        secondary_text: 'var(--xora-rose-text)',
        cocoa: 'var(--xora-cocoa)',
        ink: 'var(--xora-ink)',
        bg: 'var(--xora-blush)',
        stone: 'var(--xora-stone)',
      },
      fontSize: {
        xs: ['var(--cc-text-xs)', { lineHeight: 'var(--cc-leading-snug)' }],
        sm: ['var(--cc-text-sm)', { lineHeight: 'var(--cc-leading-snug)' }],
        base: ['var(--cc-text-md)', { lineHeight: 'var(--cc-leading-body)' }],
        lg: ['var(--cc-text-lg)', { lineHeight: 'var(--cc-leading-body)' }],
        xl: ['var(--cc-text-xl)', { lineHeight: 'var(--cc-leading-snug)' }],
        '2xl': ['var(--cc-text-2xl)', { lineHeight: 'var(--cc-leading-tight)' }],
        '3xl': ['var(--cc-text-3xl)', { lineHeight: 'var(--cc-leading-tight)' }],
        '4xl': ['var(--cc-text-4xl)', { lineHeight: 'var(--cc-leading-tight)' }],
      },
      maxWidth: {
        site: '80rem',
      },
      borderRadius: {
        card: 'var(--cc-radius)',
      },
    },
    fontFamily: {
      sans: ['var(--xora-font-body)'],
      heading: ['var(--xora-font-heading)'],
    },
  },
  plugins: [],
}
