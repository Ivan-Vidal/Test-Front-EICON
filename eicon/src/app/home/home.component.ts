import { Movies } from './../models/home';
import { HomeService } from './../services/home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

movies: any[] = [];
show = true;
queryField = new FormControl();

readonly search_url = 'https://api.themoviedb.org/3/search/movie?api_key=9b273ba750e866b6a1e47e83f0a758fe';

  results$: Observable<any>;

  total: number;

  constructor(private http: HttpClient, private homeS: HomeService,private fb: FormBuilder,  private router: Router ,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getMovies()
  }

  getMovies() {
    this.homeS.getMovies().subscribe((obj:any) => {
      if(!obj.results) return console.log('error');
      this.movies = obj.results; 
      console.log('atualizando...', this.movies)
    });
  }
  onEdit(id) {
    this.router.navigate(['details', id]); 
  }

  onSearch(){
    this.show = !this.show;
    console.log(this.queryField.value)

    this.results$ = this.http.get(this.search_url + '&query=' + this.queryField.value).pipe(
      tap((res:any) => this.total = res.total_results),
      map((res:any) =>  res.results)
    )
    console.log(this.results$)
   
 }


}
