import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  // Initial set of images for the slider
  images = [
    { src: '/solar-cleaning.jpg', alt: 'Solar Panel Installation 1' },
    { src: '/solar-commertial.jpg', alt: 'Solar Panel Installation 2' },
    { src: '/solar-consulting.jpg', alt: 'Solar Panel Installation 3' },
    { src: '/solar-desgin.jpg', alt: 'Solar Panel Installation 4' },
    { src: '/solar-energy-team.jpg', alt: 'Solar Panel Installation 5' },
    { src: '/solar-infrastructure.jpg', alt: 'Solar Panel Installation 6' }
    
  ];
  slider: any;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Duplicate images initially for smooth looping
    this.duplicateImages();

    // Start observing the position of the slider to detect when we need to add new images
    this.setupInfiniteScroll();
  }

  // Function to duplicate images for seamless looping
  duplicateImages(): void {
    const duplicatedImages = [...this.images];
    this.images = [...this.images, ...duplicatedImages];
  }

  // Function to detect when to add new images to the slider
  setupInfiniteScroll(): void {
    const sliderElement = this.slider?.nativeElement;

    if (sliderElement) {
      // Listen for when the slider has moved to the right end
      sliderElement.addEventListener('transitionend', () => {
        this.addImageToEnd();
      });
    }
  }

  // Function to add new images to the end of the slider
  addImageToEnd(): void {
    // Duplicate images dynamically at the end
    const lastImage = this.images[this.images.length - 1];

    // Add the new image to the end of the slider
    this.images.push({
      src: lastImage.src,
      alt: lastImage.alt
    });

    // We need to ensure the slider restarts its animation smoothly
    this.resetSliderPosition();
  }

  // Function to reset the slider position for seamless looping
  resetSliderPosition(): void {
    const sliderElement = this.slider?.nativeElement;

    if (sliderElement) {
      // Disable the transition for instant reset
      sliderElement.style.transition = 'none';
      sliderElement.style.transform = 'translateX(0)'; // Reset the position

      // Re-enable the transition after a small delay
      setTimeout(() => {
        sliderElement.style.transition = 'transform 30s linear';
      }, 50); // A small delay before re-enabling transition
    }
  }
}