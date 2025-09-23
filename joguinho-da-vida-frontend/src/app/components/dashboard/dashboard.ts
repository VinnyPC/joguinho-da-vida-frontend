import { Component, OnInit } from '@angular/core';
import { Login } from '../login/login';
import { UserService } from '../../services/user-service/user-service';
import { CommonModule } from '@angular/common';
import { Header } from "../shared/header/header";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TokenService } from '../../auth/tokenService';
import { UserApiService } from '../../services/api/user-api-service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddMissaoModal } from './add-missao-modal/add-missao-modal';
import { MissaoDetails } from './missao-details/missao-details';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Header, MatProgressBarModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  
})
export class Dashboard implements OnInit {

  private loginService: Login;
  user: any;
  missoesDoUsuario: any;
  missoesAtivas: any[] = [];
  missoesConcluidas: any[] = [];
  missoesVencidas: any[] = [];
  missoesFavoritas: any[] = [];
  missoesRecomendadas: any[] = [];
  // readonly dialog = MatDialog;

  constructor(loginService: Login, private userService: UserService, private tokenService: TokenService, private userApiService: UserApiService, private dialog: MatDialog) {
    this.loginService = loginService;
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.userApiService.getMyUserInfo();
    const pontos = this.user?.pontos || 0;
    this.calculaNivel(pontos);
    this.missoesDoUsuario = this.user?.missoesAtivas || [];
    this.missoesDoUsuario.forEach((missao: any) => this.verificaTipoMissao(missao));
    console.log('MissoesAtivas:', this.missoesAtivas);
    console.log('User data on Dashboard init:', this.user);
    console.log(`Nível atual: ${this.nivelAtual}`);
    console.log(`XP atual: ${this.xpAtual}/${this.xpNecessarioProximo}`);
  }

  verificaTipoMissao(missao: any): void {
    if (missao['missaoRecomentada'] === true) {
      this.missoesRecomendadas.push(missao);
    } else if (missao['missaoFavorita'] === true) {
      this.missoesFavoritas.push(missao);
    } else if (missao['missaoAtiva'] === true) {
      this.missoesAtivas.push(missao);
    } else if (missao['missaoConcluida'] === true) {
      this.missoesConcluidas.push(missao);
    } else if (missao['missaoVencida'] === true) {
      this.missoesVencidas.push(missao);
    }
  }

  // Função para calcular a porcentagem de progresso
  nivelAtual = 1;
  xpAtual = 0;
  xpNecessarioProximo = 0;

  xpBase = 100;    // custo inicial
  fator = 1.3;     // aumenta 30% a cada nível

  xpNecessario(nivel: number): number {
    return Math.floor(this.xpBase * Math.pow(this.fator, nivel - 1));
  }

  calculaNivel(pontos: number): void {
    let nivel = 1;
    let restante = pontos;

    while (true) {
      const xpParaSubir = this.xpNecessario(nivel);
      if (restante >= xpParaSubir) {
        restante -= xpParaSubir;
        nivel++;
      } else {
        this.nivelAtual = nivel;
        this.xpAtual = restante;
        this.xpNecessarioProximo = xpParaSubir;
        break;
      }
    }
  }

  //criar nova missao
  toOpenNewMissionModal() {
    this.dialog.open(AddMissaoModal)
    console.log("abrir modal nova missão");
  }
  toOpenMissionDetails() {
    this.dialog.open(MissaoDetails)
    console.log("abrir modal nova missão");
  }
}
