import { Movies } from './../models/home';
import { UtilsService } from './utils.service';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  mostrarMenuEmitter = new EventEmitter<boolean>();
  
  
  
  constructor(private utils: UtilsService,
    private http: HttpClient) { }
    
    public getMovies(): Observable<Movies[]> {
      return this.http.get<Movies[]>('https://api.themoviedb.org/3/movie/popular?api_key=9b273ba750e866b6a1e47e83f0a758fe', httpOptions).pipe(
      retry(1),
      catchError(this.utils.handleError)
      )
      
    }
    
    loadById(id) {
      return this.http.get<Movies[]>('https://api.themoviedb.org/3/movie/' + id + '?api_key=9b273ba750e866b6a1e47e83f0a758fe' ).pipe(retry(1),
      catchError(this.utils.handleError)
      )
    }
    
  }
