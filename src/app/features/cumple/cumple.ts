import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cumple',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cumple.html',
  styleUrls: ['./cumple.css']
})
export class Cumple implements OnInit, OnDestroy {
  commandInput = '';
  activeSection: 'home' | 'clave' | 'mensaje' | 'piano' = 'home';
  terminalLogs: string[] = [];
  accessKey = 'EliabeOlah';
  birthdayMessage = 'Feliz cumpleaños. Que tu sistema siempre bootee con alegría, estabilidad y nuevas metas cumplidas.';
  displayText = '';

  pianoKeys = [
    { note: 'C4', frequency: 261.63, active: false },
    { note: 'D4', frequency: 293.66, active: false },
    { note: 'E4', frequency: 329.63, active: false },
    { note: 'F4', frequency: 349.23, active: false },
    { note: 'G4', frequency: 392.0, active: false },
    { note: 'A4', frequency: 440.0, active: false },
    { note: 'B4', frequency: 493.88, active: false },
    { note: 'C5', frequency: 523.25, active: false }
  ];

  private audioContext?: AudioContext;
  private animationTimer?: ReturnType<typeof setInterval>;
  private noteTimers: ReturnType<typeof setTimeout>[] = [];
  
  ngOnInit(): void {
    this.terminalLogs = [
      'systemd[1]: birthday-terminal.service started.',
      'Tip: usa ls, cd clave, cd mensaje, cd piano'
    ];
    this.startMatrixEffect();
  }

  ngOnDestroy(): void {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
    }
    this.clearNoteTimers();
    if (this.audioContext) {
      void this.audioContext.close();
    }
  }

  handleCommandKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.executeCommand();
    }
  }

  runQuickCommand(command: string): void {
    this.commandInput = command;
    this.executeCommand();
  }

  executeCommand(): void {
    const normalized = this.commandInput.trim().toLowerCase();
    if (!normalized) {
      return;
    }

    this.terminalLogs.push(`user@arch-bday:~$ ${this.commandInput.trim()}`);

    if (normalized === 'ls') {
      this.activeSection = 'home';
      this.terminalLogs.push('clave  mensaje  piano');
    } else if (normalized === 'cd clave') {
      this.activeSection = 'clave';
      this.terminalLogs.push('Entrando en /clave');
    } else if (normalized === 'cd mensaje') {
      this.activeSection = 'mensaje';
      this.terminalLogs.push('Entrando en /mensaje');
    } else if (normalized === 'cd piano') {
      this.activeSection = 'piano';
      this.terminalLogs.push('Entrando en /piano');
    } else {
      this.terminalLogs.push('Comando no reconocido. Usa: ls, cd clave, cd mensaje, cd piano');
    }

    this.commandInput = '';
  }

  async playHappyBirthday(): Promise<void> {
    const melody = [
      'C4', 'C4', 'D4', 'C4', 'F4', 'E4',
      'C4', 'C4', 'D4', 'C4', 'G4', 'F4',
      'C4', 'C4', 'C5', 'A4', 'F4', 'E4', 'D4',
      'B4', 'B4', 'A4', 'F4', 'G4', 'F4'
    ];

    const durations = [
      330, 180, 520, 520, 520, 1000,
      330, 180, 520, 520, 520, 1000,
      330, 180, 520, 520, 520, 520, 1000,
      330, 180, 520, 520, 520, 1000
    ];

    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    this.clearNoteTimers();

    let delay = 0;
    melody.forEach((note, index) => {
      const timer = setTimeout(() => {
        this.playNoteByName(note, durations[index]);
      }, delay);
      this.noteTimers.push(timer);
      delay += durations[index] + 40;
    });
  }

  playSingleNote(note: string): void {
    this.playNoteByName(note, 380);
  }

  private playNoteByName(note: string, durationMs: number): void {
    const key = this.pianoKeys.find((item) => item.note === note);
    if (!key) {
      return;
    }
    this.playFrequency(key.frequency, durationMs);
    key.active = true;
    const releaseTimer = setTimeout(() => {
      key.active = false;
    }, Math.max(140, durationMs - 40));
    this.noteTimers.push(releaseTimer);
  }

  private playFrequency(frequency: number, durationMs: number): void {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.0001, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.2, this.audioContext.currentTime + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      this.audioContext.currentTime + durationMs / 1000
    );

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + durationMs / 1000 + 0.04);
  }

  private clearNoteTimers(): void {
    this.noteTimers.forEach((timer) => clearTimeout(timer));
    this.noteTimers = [];
    this.pianoKeys.forEach((key) => {
      key.active = false;
    });
  }

  private startMatrixEffect(): void {
    let index = 0;
    const text = 'systemd[1]: Loaded birthday-hacker.target';
    this.animationTimer = setInterval(() => {
      if (index < text.length) {
        this.displayText += text[index];
        index++;
      } else if (this.animationTimer) {
        clearInterval(this.animationTimer);
      }
    }, 50);
  }
}

