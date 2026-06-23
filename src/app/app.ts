import { Component } from '@angular/core';
import { MutantValidatorComponent } from './components/mutant-validator/mutant-validator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MutantValidatorComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
// Cambiamos AppComponent por App para solucionar el error del main.server.ts
export class App { 
  title = 'mi-proyecto-angular';
}