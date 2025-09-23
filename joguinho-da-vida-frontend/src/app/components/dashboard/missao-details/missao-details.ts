import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-missao-details',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule, MatSelectModule],
  templateUrl: './missao-details.html',
  styleUrl: './missao-details.css'
})
export class MissaoDetails {

}
