import { Component, OnInit } from '@angular/core';
import {Noticias} from "../../_model/noticias";
import {TokenService} from "../../_service/token.service";
import {ToastrService} from "ngx-toastr";
import {NoticiasService} from "../../_service/noticias.service";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  noticias: Noticias[] = [];
  categorias: string[] = [];
  categoriaSeleccionada: string = 'Todas';
  isAdmin = false;

  constructor(
    private productoService: NoticiasService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.cargarNoticias();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarNoticias(): void {
    this.productoService.lista().subscribe(
      data => {
        this.noticias = data;
        this.categorias = ['Todas', ...new Set(this.noticias.map(noticia => noticia.category))];
      },
      err => {
        console.log(err);
      }
    );
  }

  truncateDescription(description: string, maxLength: number = 60): string {
    if (!description) {
      return '';
    }
    return description.length > maxLength
      ? description.substring(0, maxLength) + '...'
      : description;
  }

  truncateTittle(title: string, maxLength: number = 30): string {
    if (!title) {
      return '';
    }
    return title.length > maxLength
      ? title.substring(0, maxLength) + '...'
      : title;
  }

  videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
  defaultImages = [
    'assets/images/backgrounds/1.jpg',
    'assets/images/backgrounds/2.jpg',
    'assets/images/backgrounds/3.jpg',
    'assets/images/backgrounds/4.jpg',
  ];

  esVideo(url: string): boolean {
    if (!url) {
      return false;
    }
    return this.videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  }

  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.defaultImages.length);
    return this.defaultImages[randomIndex];
  }

  getImage(url: string): string {
    let image: string;
    if (!url || this.esVideo(url)) {
      image = this.getRandomImage();
    } else {
      image = url;
    }
    return image;
  }

  filtrarNoticias(): Noticias[] {
    if (this.categoriaSeleccionada === 'Todas') {
      return this.noticias;
    }
    return this.noticias.filter(noticia => noticia.category === this.categoriaSeleccionada);
  }
}
