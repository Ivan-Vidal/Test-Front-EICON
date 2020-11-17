import { HomeService } from './../services/home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  details: any;
  detail:any;
  
  
  constructor(private service: HomeService, private route: ActivatedRoute) { 
    console.log(this.route.params)
  }
  
  ngOnInit(): void {
    
    this.route.params.subscribe(
      (params:any) =>{
        const id = params['id'];
        console.log(id)
        this.details = this.service.loadById(id);
        this.details.subscribe(details =>{
          console.log(details)
          this.detail = details
        });
      }
      );
    }
  }
