const defaultTheme = require('tailwindcss/defaultTheme');
const templateColors = require('./src/colors.json');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: templateColors,
            fontWeight: {
                primaryBold: '800'
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans]
            },
            minWidth: {
                '1/2': '50%'
            },
            maxWidth: {
                xxs: '160px',
                md: '480px'
            },
            width: {
              "md-mobile": '314px'
            },
            minHeight: {
                md: '480px',
                full: '100vh',
                'screen-5/6': '90vh'
            },
            keyframes: {
                hueRotation: {
                    to: { filter: 'hue-rotate(359deg)' }
                }
            },
            backgroundImage: {
                'login-frame': "url('/public/assets/login-frame.svg')",
                //'cashback-bacgorund-pattern': "url('/assets/icons/cashback-fraim.svg')",
            },
            animation: {
                'hue-rotation': 'hueRotation 10s linear infinite'
            }
        }
    },
    plugins: [require('@tailwindcss/forms')]
};
