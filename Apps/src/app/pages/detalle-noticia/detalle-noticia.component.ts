import { Component, OnInit } from '@angular/core';
import {Noticias} from "../../_model/noticias";
import {NoticiasService} from "../../_service/noticias.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.scss']
})
export class DetalleNoticiaComponent implements OnInit {

  noticia!: Noticias;
  relatedNoticias: Noticias[] = [];

  constructor(
    private productoService: NoticiasService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.detail(id).subscribe(
      data => {
        this.noticia = data;
        this.loadRelatedNoticias(data.category);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
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

  volver(): void {
    this.router.navigate(['/noticias']);
  }

  private loadRelatedNoticias(category: string): void {
    this.productoService.getRelatedNoticias(category).subscribe(
      data => {
        // Filtra para mostrar solo 3 noticias
        this.relatedNoticias = data.slice(0, 3);
      },
      err => {
        this.toastr.error('No se pudieron cargar las noticias relacionadas', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
