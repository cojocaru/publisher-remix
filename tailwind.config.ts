import type {Config} from 'tailwindcss'

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#e77874'
            }
        }
    },
    plugins: [],
} satisfies Config
