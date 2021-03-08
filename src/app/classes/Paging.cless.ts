export class Paging {

	public pageMap: { [key: number]: any[] }  = {};

	constructor(

		public newPage: () => Promise<any>

	) {}

	public async getPage(pageNum: number): Promise<any> {

		if (!this.pageMap[pageNum]) 
			
			this.pageMap[pageNum]	= await this.newPage();

		return this.pageMap[pageNum];

	}

}