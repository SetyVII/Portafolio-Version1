import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cumple',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cumple.html',
  styleUrls: ['./cumple.css']
})
export class Cumple implements OnInit {
  password: string = '';
  isUnlocked: boolean = false;
  errorMessage: string = '';
  specialKey: string = 'EliabeOlah'; // Clave especial - Nombre del cumpleañero
  matrixChars: string = '01アウェイ';
  displayText: string = '';
  giftCode: string = 'GIFT-' + Math.random().toString(36).substring(2, 15).toUpperCase().slice(0, 12);
  copyFeedback: string = '';
  
  ngOnInit(): void {
    this.startMatrixEffect();
  }

  verifyPassword(): void {
    if (this.password === this.specialKey) {
      this.isUnlocked = true;
      this.errorMessage = '';
    } else {
      this.errorMessage = '❌ Acceso denegado. Contraseña incorrecta.';
      this.password = '';
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.verifyPassword();
    }
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.giftCode).then(() => {
      this.copyFeedback = '✓ Código copiado al portapapeles';
      setTimeout(() => {
        this.copyFeedback = '';
      }, 2000);
    }).catch(() => {
      this.copyFeedback = '✗ Error al copiar';
      setTimeout(() => {
        this.copyFeedback = '';
      }, 2000);
    });
  }

  private startMatrixEffect(): void {
    let index = 0;
    const text = 'SISTEMA DE CELEBRACIÓN ACTIVADO...';
    setInterval(() => {
      if (index < text.length) {
        this.displayText += text[index];
        index++;
      }
    }, 50);
  }
}

