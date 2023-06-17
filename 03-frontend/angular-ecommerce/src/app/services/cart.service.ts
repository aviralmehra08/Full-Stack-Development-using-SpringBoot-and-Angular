import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  
  constructor() {}

  addToCart(theCartItem: CartItem){
    //check if we already have the item in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined= undefined;
    if(this.cartItems.length > 0){
      //find the item in the cart based on item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      // for(let tempCartItem of this.cartItems){
      //   if(tempCartItem.id === theCartItem.id){
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }
      //check if we already have the item in the cart
      alreadyExistsInCart = (existingCartItem !== undefined);
    }
    if(alreadyExistsInCart){
      //increment the quantity
      if(existingCartItem!==undefined){
        existingCartItem.quantity++;
      }
    }
    else{
      //add the item to the cart
      this.cartItems.push(theCartItem);
    }
    //compute cart total price and quantity
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity*currentCartItem.unitPrice;
      totalQuantityValue+= currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)},totalQuantity: ${totalQuantityValue}`);
    console.log('----------------------------------------------------------------');
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if(theCartItem.quantity==0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    //get index of item in array
    const itemIndex = this.cartItems.findIndex(tempCartItem=>tempCartItem.id === theCartItem.id);
    //if found remove the item
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }
}
