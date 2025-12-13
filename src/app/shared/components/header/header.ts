import { Component, signal, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements AfterViewInit, OnDestroy {
  isMenuOpen = signal(false);
  private routerSubscription: Subscription | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
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
      color: "#ffffff"
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

    // Hero Background Animation: Black -> White
    // Ensure initial state is set first
    gsap.set("#hero-section", { backgroundColor: "#111827" });
    tl.fromTo("#hero-section",
      { backgroundColor: "#111827" }, // gray-900
      { backgroundColor: "#f3f4f6" }  // gray-100
    );

    // Hero "Hello, I'm" Text Animation: White -> Black
    gsap.set("#hero-text", { color: "#ffffff" });
    tl.fromTo("#hero-text",
      { color: "#ffffff" },
      { color: "#111827" },
      "<"
    );

    // Name Animation: From Hero (Center, White, Large) to Header (Center, White, Normal)
    // Note: Name stays White because it lands on the Dark Header
    tl.fromTo("#hero-name",
      {
        top: "50vh",
        scale: 2.0,
        color: "#ffffff", // White on Black Hero
      },
      {
        top: "50%",
        scale: 1,
        color: "#ffffff", // White on Gray-800 Header
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
}
