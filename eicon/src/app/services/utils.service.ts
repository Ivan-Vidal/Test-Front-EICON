import { Injectable } from '@angular/core';
import { throwError, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  
  constructor() { }
  
  public handleError(error: any): ObservableInput<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.errors) {
      error.errors.forEach((erro) => {
        errorMessage = `${errorMessage} ${erro}`;
      });
    } else {
      errorMessage = `Error Code: ${error.status}\nMenssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}