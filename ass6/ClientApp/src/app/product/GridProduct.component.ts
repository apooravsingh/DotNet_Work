import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-grid-product',
  templateUrl: './grid-product-component.html',
  styleUrls: ['./grid-product.component.css']
  })

export class GridProductComponent implements OnInit {

    @Output() recordDeleted = new EventEmitter<any>();
    @Output() newClicked = new EventEmitter<any>();
    @Output() editClicked = new EventEmitter<any>();
    @Input() productData: Array<any>;

    constructor() { }

    ngOnInit() {
    }

    public editRecord1()
    {
    alert('success');
}
    public deleteRecord(record) 
    {
      this.recordDeleted.emit(record);
    }

    public editRecord(record) 
    {
      const clonedRecord = Object.assign({}, record);
      this.editClicked.emit(clonedRecord);
    }

    public newRecord() 
    {
      this.newClicked.emit();
    }
}