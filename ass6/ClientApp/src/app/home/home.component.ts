import { Component } from '@angular/core';
import { ProductService } from '../product/product.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
 export class HomeComponent {
    public productData: Array<any>;
    public currentProduct: any;

    constructor (private productService: ProductService) {
        productService.get().subscribe((data: any) => this.productData = data);
        this.currentProduct = this.setInitialValuesForProductData();
    }

    private setInitialValuesForProductData () 
    {
      return {
        id: undefined,
        name: '',
        isAvailable: false,
        }
    }
  
    public createOrUpdateProduct = function(product: any) 
    {
        // if product is present in productData, we can assume this is an update
        // otherwise it is adding a new element
        let productWithId;
        productWithId = _.find(this.productData, (el => el.id === product.id));

            if (productWithId) 
            {
              const updateIndex = _.findIndex(this.productData, {id: productWithId.id});
              this.productService.update(product).subscribe(
                productRecord =>  this.productData.splice(updateIndex, 1, product)
              );
            } 
            else 
            {
              this.productService.add(product).subscribe(
              productRecord => this.productData.push(product)
              );
            }

        this.currentProduct = this.setInitialValuesForProductData();
    };

    public editClicked = function(record) 
    {
      this.currentProduct = record;
    };

    public newClicked = function() 
    {
      this.currentProduct = this.setInitialValuesForProductData(); 
    };

    public deleteClicked(record) 
    {
      const deleteIndex = _.findIndex(this.productData, {id: record.id});
      this.productService.remove(record).subscribe(
        result => this.productData.splice(deleteIndex, 1)
      );
    }
}
