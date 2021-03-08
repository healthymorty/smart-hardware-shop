export class Paging {

	public pageMap: { [key: number]: any[] }  = {};

	constructor(

		public getNewPage: (pageNum: number) => Promise<any>

	) {}

	public async getPage(pageNum: number): Promise<any> {

		if (!this.pageMap[pageNum]) 
			
			this.pageMap[pageNum]	= await this.getNewPage(pageNum);

		return this.pageMap[pageNum];

	}

}