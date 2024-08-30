export class Noticias {
  id?: number;
  title: string;
  description: string;
  fecha: string;
  image: string;
  category: string;
  publishedAt: string;
  author?: string;
  url?: string;
  source: string;

  constructor(titulo: string, precio: string, fecha: string, imagen: string, category: string, author: string, url: string, source: string) {
    this.title = titulo;
    this.description = precio;
    this.fecha = fecha;
    this.image = imagen;
    this.category = category;
    this.publishedAt = fecha;
    this.author = author;
    this.url = url;
    this.source = source;
  }
}
