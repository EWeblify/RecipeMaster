function loadFooter() {
    fetch('footer.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('footer').innerHTML = data;
      });
  }

  function loadHeader() {
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });
}

window.onload = function() {
      loadHeader();
      loadFooter();
  };
  
// Adding a favoourite button on item
// Select all elements with the class 'favorite-btn'
const favoriteBtns = document.querySelectorAll('.favorite-btn');

// Loop through all buttons and add a click event listener to each
favoriteBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        icon.classList.toggle('far'); // Toggle empty heart
        icon.classList.toggle('fas'); // Toggle filled heart
        this.classList.toggle('favorited');
    });
});

// slider
const slider = document.getElementById('slider');
let isDragging = false;
let startX, currentX;
let slideIndex = 1; // Start on the first real slide
let autoSlideInterval;
const slideDuration = 3000; // Time between slides
const slideWidth = 400 + 40; // Width of slide + space between
const totalSlides = slider.children.length;

// Clone the first and last slides for infinite loop effect
const firstClone = slider.children[0].cloneNode(true); // Clone the first real slide
const lastClone = slider.children[totalSlides - 1].cloneNode(true); // Clone the last real slide

slider.appendChild(firstClone); // Add the cloned first slide to the end
slider.insertBefore(lastClone, slider.children[8]); // Add the cloned last slide to the beginning

// Update the total number of slides to include the clones
let actualSlides = totalSlides + 1;

// Function to move the slider
const moveToSlide = (index) => {
    slider.style.transition = 'transform 0.5s ease';
    slider.style.transform = `translateX(${-index * slideWidth}px)`;
};

// Auto-sliding functionality with infinite loop
const autoSlide = () => {
    slideIndex++;
    moveToSlide(slideIndex);

    // Handle transition after reaching the last cloned slide
    if (slideIndex === actualSlides - 1) {
        setTimeout(() => {
            slider.style.transition = 'none'; // Disable animation for instant reset
            slideIndex = 1; // Reset to the first real slide
            moveToSlide(slideIndex);
        }, 500); // Wait for the slide transition to finish
    }
};

// Start auto-sliding
const startAutoSlide = () => {
    autoSlideInterval = setInterval(autoSlide, slideDuration);
};

// Stop auto-sliding
const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
};

// Dragging functionality
const handleDragStart = (event) => {
    isDragging = true;
    startX = event.clientX || event.touches[0].clientX;
    stopAutoSlide();  // Stop auto-sliding during drag
};

const handleDragMove = (event) => {
    if (!isDragging) return;
    currentX = event.clientX || event.touches[0].clientX;
    const deltaX = currentX - startX;
    slider.style.transition = 'none'; // Disable animation during drag
    slider.style.transform = `translateX(${-slideIndex * slideWidth + deltaX}px)`;
};

const handleDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;

    // Determine if drag was long enough to change slides
    if (currentX - startX > 50 && slideIndex > 1) {
        slideIndex--; // Move to previous slide
    } else if (startX - currentX > 50 && slideIndex < actualSlides - 1) {
        slideIndex++; // Move to next slide
    }
    
    moveToSlide(slideIndex);
    startAutoSlide(); // Resume auto-sliding after drag ends

    // Handle the wrap-around cases
    if (slideIndex === 0) {
        setTimeout(() => {
            slider.style.transition = 'none';
            slideIndex = actualSlides - 2; // Move to the last real slide
            moveToSlide(slideIndex);
        }, 500);
    }
    if (slideIndex === actualSlides - 1) {
        setTimeout(() => {
            slider.style.transition = 'none';
            slideIndex = 1; // Move to the first real slide
            moveToSlide(slideIndex);
        }, 500);
    }
};

// Event listeners for dragging
slider.addEventListener('mousedown', handleDragStart);
slider.addEventListener('mousemove', handleDragMove);
slider.addEventListener('mouseup', handleDragEnd);
slider.addEventListener('mouseleave', handleDragEnd);

slider.addEventListener('touchstart', handleDragStart);
slider.addEventListener('touchmove', handleDragMove);
slider.addEventListener('touchend', handleDragEnd);

// Initialize the slider on the first real slide
moveToSlide(slideIndex);
startAutoSlide();


// Side button
 // Get the button element
 var scrollBtn = document.getElementById("scrollBtn");

 // Show the button when user scrolls down 100px from the top
 window.onscroll = function() {
     if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
         scrollBtn.style.display = "flex";
     } else {
         scrollBtn.style.display = "none";
     }
 };

 // Scroll to the top when the button is clicked
 scrollBtn.onclick = function() {
     window.scrollTo({top: 0, behavior: 'smooth'});
 };