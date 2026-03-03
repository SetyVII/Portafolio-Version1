import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cumple',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cumple.html',
  styleUrls: ['./cumple.css']
})
export class Cumple implements OnInit, OnDestroy {
  particles: { id: number; left: number; delay: number }[] = [];
  particleCount = 50;
  private particleIdCounter = 0;

  ngOnInit(): void {
    this.generateParticles();
  }

  ngOnDestroy(): void {
    this.particles = [];
  }

  private generateParticles(): void {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        id: this.particleIdCounter++,
        left: Math.random() * 100,
        delay: Math.random() * 2
      });
    }
  }

  getParticleEmoji(): string {
    const emojis = ['🎉', '🎊', '🎈', '🎁', '⭐', '✨'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }
}
