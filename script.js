let travelData = null;

async function loadData() {
  if (travelData) return;
  const response = await fetch('data.json');
  travelData = await response.json();
}

function renderResults(items, title) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = title;
  resultsDiv.appendChild(heading);

  const container = document.createElement('div');
  container.className = 'card-container';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.name;

    const name = document.createElement('h3');
    name.textContent = item.name;

    const desc = document.createElement('p');
    desc.textContent = item.description || '';

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(desc);
    container.appendChild(card);
  });

  resultsDiv.appendChild(container);
}

async function handleSearch() {
  const term = document.getElementById('search-input').value.toLowerCase().trim();
  if (!term) return;

  await loadData();

  if (term.includes('beach')) {
    renderResults(travelData.beaches, 'Beach Recommendations');
  } else if (term.includes('temple')) {
    renderResults(travelData.temples, 'Temple Recommendations');
  } else if (term.includes('country')) {
    renderResults(travelData.countries, 'Country Recommendations');
  } else {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>No results. Try searching for "beach", "temple", or "country".</p>';
  }
}

function handleClear() {
  document.getElementById('search-input').value = '';
  document.getElementById('results').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const clearBtn = document.getElementById('clear-btn');

  if (searchBtn) searchBtn.addEventListener('click', handleSearch);
  if (clearBtn) clearBtn.addEventListener('click', handleClear);

  const input = document.getElementById('search-input');
  if (input) {
    input.addEventListener('keyup', event => {
      if (event.key === 'Enter') handleSearch();
    });
  }
});