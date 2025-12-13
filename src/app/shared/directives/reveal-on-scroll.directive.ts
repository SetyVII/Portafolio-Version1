import { Directive, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[appRevealOnScroll]'
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
    private observer: IntersectionObserver | undefined;

    constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) { }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.el.nativeElement.classList.add('revealed');
                    } else {
                        this.el.nativeElement.classList.remove('revealed');
                    }
                });
            }, {
                threshold: 0.1
            });

            this.observer.observe(this.el.nativeElement);
        }
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
