module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fira':  ["Fira Code"],
      },
      fontSize: {
        'footer': '15px',
        'base': '18px',
        'code': '30px',
        'h1': '40px',
      },
      colors: {
        background: '#191B26',
        specialCharacter: '#89DDFF',
        string: '#9ECE54',
        reservedWords: '#BB79A9',
        numbers: '#FF9046',
        noStyle: '#51597D',
        brand: '#E0B200',
      },
      screens: {
        custom: {
          'container': '750px', 
        },
      },
    },
  },
  plugins: [],
}