import { IAddress }	from './Address.interface';

import { IName }	from './Name.interface';

import { IOrder }	from './Order.interface';

export interface IUser {

	id:			number;
	
	name:		IName,
	
	phone:		string,
	
	avatar: 	string,
	
	email: 		string,
	
	address: 	IAddress,
	
	role:		string,
	
	orders:		IOrder[],
}