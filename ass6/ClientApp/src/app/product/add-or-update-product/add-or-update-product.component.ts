import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-or-update-product',
  templateUrl: './add-or-update-product.component.html',
  styleUrls: ['./add-or-update-product.component.css']
})
export class AddOrUpdateProductComponent implements OnInit {

  @Output() productCreated = new EventEmitter<any>();
  @Input()  productInfo: any;

  public buttonText = 'Save';

    constructor() { 
      this.clearProductInfo();
      console.log(this.productInfo.name);
    }

  ngOnInit() {
  }

    private clearProductInfo = function() {
    // Create an empty product object
    this.productInfo = {
      id: undefined,
      name: '',
      isAvailable: false,
    };
    };

    public addOrUpdateProductRecord = function(event) {
    this.productCreated.emit(this.productInfo);
    this.clearProductInfo();
  };

}
