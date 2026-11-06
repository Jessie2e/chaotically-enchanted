const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.product-card');
function filterCollection(category) {
  let count = 0;
  cards.forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
    if (!card.hidden) count++;
  });
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  document.querySelector('#product-count').textContent = `${count} ${count === 1 ? 'piece' : 'pieces'} to explore`;
}
filters.forEach(button => button.addEventListener('click', () => filterCollection(button.dataset.filter)));
document.querySelectorAll('nav [data-category]').forEach(link => {
  link.addEventListener('click', () => filterCollection(link.dataset.category));
});

// Native horizontal scrolling supports touch swipes; buttons and keys offer the same controls.
document.querySelectorAll('.product-gallery').forEach(gallery => {
  const track = gallery.querySelector('.gallery-track');
  const slides = track.querySelectorAll('img');
  const status = gallery.querySelector('.gallery-status');
  const index = () => Math.round(track.scrollLeft / track.clientWidth) || 0;
  function move(direction) {
    const next = (index() + direction + slides.length) % slides.length;
    track.scrollTo({ left: next * track.clientWidth, behavior: 'instant' });
  }
  gallery.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => move(Number(button.dataset.direction)));
  });
  track.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  });
  track.addEventListener('scroll', () => {
    status.textContent = `${index() + 1} / ${slides.length}`;
  }, { passive: true });
});
