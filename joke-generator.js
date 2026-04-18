// Random Joke Generator using JokeAPI

const jokeContainer = document.getElementById('joke-container');
const jokeBtn = document.getElementById('joke-btn');
const loadingSpinner = document.getElementById('loading');

// Fetch and display a random joke
async function getRandomJoke() {
  try {
    // Show loading state
    loadingSpinner.style.display = 'block';
    jokeContainer.textContent = '';
    jokeBtn.disabled = true;

    // Fetch joke from JokeAPI
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?format=json');
    const data = await response.json();

    if (data.error) {
      jokeContainer.textContent = 'Failed to fetch joke. Try again!';
      return;
    }

    // Display joke based on type
    let jokeText = '';
    if (data.type === 'single') {
      jokeText = data.joke;
    } else {
      jokeText = `${data.setup}\n\n${data.delivery}`;
    }

    jokeContainer.textContent = jokeText;
    jokeContainer.style.color = '#333';

  } catch (error) {
    jokeContainer.textContent = 'Oops! Something went wrong. Please try again.';
    console.error('Error fetching joke:', error);
  } finally {
    loadingSpinner.style.display = 'none';
    jokeBtn.disabled = false;
  }
}

// Event listener for button click
jokeBtn.addEventListener('click', getRandomJoke);

// Load a joke on page load
window.addEventListener('load', getRandomJoke);
