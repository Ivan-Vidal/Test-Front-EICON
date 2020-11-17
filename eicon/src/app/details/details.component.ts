import { HomeService } from './../services/home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

form: FormGroup = this.fb.group({
  id:  ['', []],
  vote_average: ['',[]],
  title: ['', []],
  original_title: ['', []],
  overview: ['', []],
  original_language: ['', []]

        
})
details: any;
detail:any;


  constructor(private service: HomeService, private route: ActivatedRoute, private fb: FormBuilder ) { 
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
