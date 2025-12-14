import { Component, signal, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements AfterViewInit, OnDestroy {
  isMenuOpen = signal(false);
  private routerSubscription: Subscription | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private contentService: ContentService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  toggleLang() {
    this.contentService.toggleLanguage();
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.handleRouteAnimation(this.router.url);

      this.routerSubscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.handleRouteAnimation(event.urlAfterRedirects);
      });
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  private handleRouteAnimation(url: string) {
    // Kill existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf(["#hero-name", "#nav-left", "#nav-right", "#hero-section", "#hero-text"]);

    if (url === '/' || url === '/home') {
      this.initHomeAnimation();
    } else {
      this.setFixedHeader();
    }
  }

  private setFixedHeader() {
    // Reset to fixed state for non-home pages
    gsap.set("#hero-name", {
      top: "50%",
      scale: 1,
      color: "#dedede"
    });

    gsap.set(["#nav-left", "#nav-right"], {
      x: "0%",
      opacity: 1
    });
  }

  private initHomeAnimation() {
    // Create a timeline to sync animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=400",
        scrub: 1
      }
    });

    // Hero Background Animation: Deep Black -> Matte Black (Subtle)
    gsap.set("#hero-section", { backgroundColor: "#050505" });
    tl.fromTo("#hero-section",
      { backgroundColor: "#050505" },
      { backgroundColor: "#0a0a0a" }
    );

    // Hero "Hello" Text: Remains White/Gray, maybe fades out?
    // Let's keep it static or subtle fade to avoid coloring issues
    gsap.set("#hero-text", { color: "#ffffff" });
    tl.to("#hero-text",
      { opacity: 0, scale: 0.9 }, // Fade out slightly as we scroll
      "<"
    );

    // Name Animation: From Hero (Center, Huge) to Header (Center, Normal)
    const isMobile = window.innerWidth < 700;
    const startScale = isMobile ? 2.0 : 4.0;

    tl.fromTo("#hero-name",
      {
        top: "39vh", // Start lower in the hero
        scale: startScale, // Responsive Scale
        color: "#ffffff",
        textShadow: "0 0 20px rgba(255,255,255,0.5)"
      },
      {
        top: "50%",
        scale: 1,
        color: "#dedede",
        textShadow: "none"
      },
      "<"
    );

    // Nav Buttons Animation: From Center to Sides
    tl.fromTo("#nav-left",
      { x: "150%", opacity: 0 },
      { x: "0%", opacity: 1 },
      "<"
    );

    tl.fromTo("#nav-right",
      { x: "-150%", opacity: 0 },
      { x: "0%", opacity: 1 },
      "<"
    );
  }

  scrollTo(elementId: string): void {
    if (elementId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // Close mobile menu if open
    if (this.isMenuOpen()) {
      this.toggleMenu();
    }
  }
}
