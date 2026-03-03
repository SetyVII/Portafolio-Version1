import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cumple } from './cumple';

describe('Cumple', () => {
  let component: Cumple;
  let fixture: ComponentFixture<Cumple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cumple],
    }).compileComponents();

    fixture = TestBed.createComponent(Cumple);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate particles on init', () => {
    expect(component.particles.length).toBe(component.particleCount);
  });

  it('should return a valid emoji', () => {
    const emoji = component.getParticleEmoji();
    const validEmojis = ['🎉', '🎊', '🎈', '🎁', '⭐', '✨'];
    expect(validEmojis).toContain(emoji);
  });

  it('should clear particles on destroy', () => {
    expect(component.particles.length).toBeGreaterThan(0);
    component.ngOnDestroy();
    expect(component.particles.length).toBe(0);
  });
});
