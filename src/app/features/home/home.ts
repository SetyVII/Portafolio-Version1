import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { gsap } from 'gsap';
import { ContentService, PortfolioContent } from '../../core/services/content.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnInit {
  content!: PortfolioContent;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.contentService.content$.subscribe(content => {
      this.content = content;
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.to("#hero-content", {
        opacity: 1,
        duration: 1.5,
        delay: 1.5, // Delay to let the user focus on the greeting
        ease: "power2.out"
      });
    }
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

