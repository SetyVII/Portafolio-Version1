import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Cumple } from './cumple';

describe('Cumple', () => {
  let component: Cumple;
  let fixture: ComponentFixture<Cumple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cumple, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Cumple);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with locked state', () => {
    expect(component.isUnlocked).toBeFalse();
  });

  it('should unlock with correct password', () => {
    component.password = 'EliabeOlah';
    component.verifyPassword();
    expect(component.isUnlocked).toBeTrue();
  });

  it('should show error message with incorrect password', () => {
    component.password = 'wrongpassword';
    component.verifyPassword();
    expect(component.isUnlocked).toBeFalse();
    expect(component.errorMessage).toContain('Acceso denegado');
  });

  it('should clear password on incorrect attempt', () => {
    component.password = 'wrongpassword';
    component.verifyPassword();
    expect(component.password).toBe('');
  });

  it('should generate matrix text on init', () => {
    expect(component.displayText.length).toBeGreaterThan(0);
  });

  it('should generate a gift code on init', () => {
    expect(component.giftCode).toBeTruthy();
    expect(component.giftCode.startsWith('GIFT-')).toBeTrue();
  });

  it('should copy gift code to clipboard', async () => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    component.copyToClipboard();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(component.giftCode);
  });

  it('should show copy feedback message', (done) => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    component.copyToClipboard();
    setTimeout(() => {
      expect(component.copyFeedback).toContain('Código copiado');
      done();
    }, 100);
  });
});


