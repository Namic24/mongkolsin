// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // เพิ่มเส้นทางไฟล์ของคุณ
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // ใช้โหมดสว่างเป็นค่าเริ่มต้น
  },
}
