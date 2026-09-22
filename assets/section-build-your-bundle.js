/**
 * Oak & Lily Gifting Combos track drag & swipe support
 */
document.addEventListener('DOMContentLoaded', () => {
  const tracks = document.querySelectorAll('.combos-carousel-track');

  tracks.forEach((track) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasMoved = false;

    track.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDown = true;
      hasMoved = false;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.cursor = 'grabbing';
      track.style.userSelect = 'none';
      track.style.scrollSnapType = 'none';
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      track.style.cursor = '';
      track.style.removeProperty('user-select');
      track.style.scrollSnapType = 'x mandatory';
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 5) {
        hasMoved = true;
      }
      track.scrollLeft = scrollLeft - walk;
    });

    track.addEventListener(
      'click',
      (e) => {
        if (hasMoved) {
          e.preventDefault();
          e.stopPropagation();
          hasMoved = false;
        }
      },
      true
    );
  });
});
