
const greetButton = document.getElementById('greet-btn');
const greetText = document.getElementById('greet-text');

const greetings = [
  'Hej från Alexander och Abdulqadir! 👋',
  'B&B kör hackathon idag 🚀',
  'Tack för besöket på vår sida!'
];

let count = 0;

greetButton.addEventListener('click', () => {
  greetText.textContent = greetings[count % greetings.length];
  count++;
});
