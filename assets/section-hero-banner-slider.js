/**
 * Oak & Lily Hero Banner Slider
 * Handles automated slide transitions, touch swipe, pause-on-hover, and keyboard navigation.
 */
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.custom-banner-slider');

  sliders.forEach((sliderContainer) => {
    const track = sliderContainer.querySelector('.banner-slider');
    if (!track) return;

    const slides = track.querySelectorAll('.banner-slide');
    const totalSlides = slides.length;
    if (totalSlides <= 1) return;

    let currentIndex = 0;
    let timer = null;
    const autoRotate = sliderContainer.dataset.autoRotate === 'true';
    const speed = parseInt(sliderContainer.dataset.speed, 10) || 4000;

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startTimer() {
      if (autoRotate && !timer) {
        timer = setInterval(nextSlide, speed);
      }
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function resetTimer() {
      stopTimer();
      startTimer();
    }

    // Touch swipe support
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    track.addEventListener('touchstart', (e) => {
      stopTimer();
      startX = e.touches[0].clientX;
      isSwiping = true;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      currentX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      const diffX = startX - currentX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startTimer();
    });

    // Pause on hover
    sliderContainer.addEventListener('mouseenter', stopTimer);
    sliderContainer.addEventListener('mouseleave', startTimer);

    // Keyboard accessibility
    sliderContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
        resetTimer();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        resetTimer();
      }
    });

    startTimer();
  });
});
