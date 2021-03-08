import { Injectable }	from '@angular/core';

@Injectable()

export class LocalStorageService {

	public localStorage: Storage;

	get isSupported(): boolean {

		return !!this.localStorage;

	}
	
	constructor() {

		this.localStorage	= window.localStorage;

	}

	public getItem(key: string): any {

		return JSON.parse(this.localStorage.getItem(key) as any);

	}

	public setItem(key: string, value: any): void {
		
		this.localStorage.setItem(key, JSON.stringify(value));

	}
	
	public remove(key: string): void {
		
		this.localStorage.removeItem(key);

	}

}