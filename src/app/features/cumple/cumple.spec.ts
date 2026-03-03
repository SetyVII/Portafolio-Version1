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

  it('should initialize with unauthenticated state', () => {
    expect(component.isAuthenticated).toBeFalse();
  });

  it('should authenticate with correct sudo password', () => {
    component.sudoPassword = 'Eliabe';
    component.verifySudo();
    expect(component.isAuthenticated).toBeTrue();
  });

  it('should show error with incorrect sudo password', () => {
    component.sudoPassword = 'wrongpassword';
    component.verifySudo();
    expect(component.isAuthenticated).toBeFalse();
    expect(component.showSudoError).toBeTrue();
  });

  it('should execute ls command', () => {
    component.isAuthenticated = true;
    component.commandInput = 'ls';
    component.executeCommand();

    expect(component.activeSection).toBe('home');
    expect(component.terminalLogs.at(-1)).toContain('clave');
  });

  it('should navigate to clave section with cd clave', () => {
    component.isAuthenticated = true;
    component.commandInput = 'cd clave';
    component.executeCommand();

    expect(component.activeSection).toBe('clave');
  });

  it('should navigate to mensaje section with cd mensaje', () => {
    component.isAuthenticated = true;
    component.commandInput = 'cd mensaje';
    component.executeCommand();

    expect(component.activeSection).toBe('mensaje');
  });

  it('should navigate to piano section with cd piano', () => {
    component.isAuthenticated = true;
    component.commandInput = 'cd piano';
    component.executeCommand();

    expect(component.activeSection).toBe('piano');
  });

  it('should keep section for unknown commands and log error', () => {
    component.isAuthenticated = true;
    const currentSection = component.activeSection;
    component.commandInput = 'invalid';
    component.executeCommand();

    expect(component.activeSection).toBe(currentSection);
    expect(component.terminalLogs.at(-1)).toContain('Tip');
  });

  it('should trigger quick command execution', () => {
    component.isAuthenticated = true;
    component.runQuickCommand('cd piano');
    expect(component.activeSection).toBe('piano');
  });

  it('should expose access key', () => {
    expect(component.accessKey).toBe('Eliabe');
  });
});


