import { Component } from '@angular/core';
import { OperationService } from './operation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'calculator-demo';
  
  // For Initail value
  toShow = '0';
  // For updated value
  currentValue = '';

  constructor(public opService: OperationService) {}

  // Collecting information and attaching to the current.
  collectInput(value: string) {
    this.currentValue += value; 
    this.toShow = this.currentValue;
  }

  // Calculating input 
  getResult() {
    // Evaluating result by sending backend
    this.opService.evaluateResult(this.currentValue, (result) => {
      
      // Storing data from database result.
      this.toShow = result;
      this.currentValue = this.toShow;
    });
   
    
  }

  // Clearing input feild and making default as 0
  clear() {
    this.currentValue = '';
    this.toShow = '0';
  }

   // To remove last element by using string slice with last index.
  deleteLastOne() {
    this.currentValue = this.currentValue.slice(0, -1);
    this.toShow = this.currentValue;

    // If nothing is there keeping initial value as 0
    if(this.toShow == '') { this.toShow = '0'}
    
  }

  // When we enter through keyboard
  calculateValue(val: any){

    // Ignoring 0 
    if(val.charAt(0) == '0') {
      val = val.slice(1,);
    }
    this.toShow = eval(val);
    this.opService.evaluateResult(val, (result) => {
      
      // Storing data from database result.
      this.toShow = result;
      this.currentValue = this.toShow;
    });
   
  }
}
