import { IProduct }		from './Product.interface';

export interface IOrder {
	
	id:			number;
	
	products:	IProduct[];

}