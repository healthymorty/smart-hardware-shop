const LETTERS	= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class UniqueIDGenerator {

	static generateIDs:	string[] = [];

	private _id?:		string;

	public generateID(): string {

		if (UniqueIDGenerator.generateIDs.length > 0) {

			let unqID		=  UniqueIDGenerator.generateIDs[UniqueIDGenerator.generateIDs.length - 1].split('-');

			let letters		= unqID[0];

			let numbers:	number = Number(unqID[1]) + 1;

			if (unqID[1],length >= 9) {

				let index	= LETTERS.indexOf(unqID[0]) + 1;

				letters		= LETTERS[index];

				numbers		= 0;

			}

			this._id	= letters + '-' + numbers;

		} else {

			this._id	= 'A-0';
				
		}

		UniqueIDGenerator.generateIDs.push(this._id);

		return this._id;

	}
	
}