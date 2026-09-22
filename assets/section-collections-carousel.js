/**
 * Oak & Lily Collections Carousel
 * Optional mouse drag-to-scroll for desktop users with native scroll-snap.
 */
document.addEventListener('DOMContentLoaded', () => {
  const tracks = document.querySelectorAll('.collections-carousel__track');

  tracks.forEach((track) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasMoved = false;

    track.addEventListener('mousedown', (e) => {
      // Only primary mouse button
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

    // Prevent link click when user was dragging
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
