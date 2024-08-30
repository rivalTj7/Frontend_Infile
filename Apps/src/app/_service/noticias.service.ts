import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Noticias} from "../_model/noticias";


@Injectable({
  providedIn: 'root'
})

export class NoticiasService {

  noticiasURL = environment.HOST2;

  constructor(
    private httpClient: HttpClient
  ) { }

  public lista(): Observable<Noticias[]> {
    return this.httpClient.get<Noticias[]>(this.noticiasURL + 'lista');
  }

  public detail(id: number): Observable<Noticias> {
    return this.httpClient.get<Noticias>(this.noticiasURL + `detail/${id}`);
  }

  public save(noticias: Noticias): Observable<any> {
    return this.httpClient.post<any>(this.noticiasURL + 'create', noticias);
  }

  public update(id: number, noticias: Noticias): Observable<any> {
    return this.httpClient.put<any>(this.noticiasURL + `update/${id}`, noticias);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.noticiasURL + `delete/${id}`);
  }

  getRelatedNoticias(category: string): Observable<Noticias[]> {
    return this.httpClient.get<Noticias[]>(this.noticiasURL + `noticias/${category}`);
  }

}
