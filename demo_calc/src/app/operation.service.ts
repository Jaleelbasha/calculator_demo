import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  constructor(private http: HttpClient) { }

  // Evaluating result by sending data
  evaluateResult(evaluate: string, cb) {
    let data = {"value" : evaluate};
    this.http.post('http://localhost:3000/api/store', data)
    .subscribe((result: any) => {
      cb(result.data);
    });
  }
}
