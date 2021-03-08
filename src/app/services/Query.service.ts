import { HttpClient, HttpHeaders, HttpRequest }	from '@angular/common/http';

import { Injectable }       from '@angular/core';

import { map, tap, last }	from 'rxjs/operators';

import { Observable }		from 'rxjs';

import { EventsService }		from './Events.service';

import { 

	IProgressEvent,
	
	IQueryResponse,

	IRequestOptions 

}	from '@interfaces/index';

import { UniqueIDGenerator } from '@classes/UniqueIDGenerator.class';

@Injectable()

export class QueryService {

	public queryProgressMap: { [key: string]: IProgressEvent }	= {};

	get requestOptions(): IRequestOptions {

		return {

			headers:		new HttpHeaders(),

			responseType:	'json',

			reportProgress:	true

		};

	}

	constructor(

		private _eventsService:	EventsService,

		private _httpClient: 	HttpClient

	) {}
	
	public callRest(

		method: string,
		
		url:	string, 
		
		id?:	number, 
		
		data?:	string,

		responseType:	'arraybuffer'|'blob'|'json'|'text' = 'json'
		
	): Promise<IQueryResponse> {

		let query: Observable<any>;

		const queryId	= new UniqueIDGenerator().generateID();

		this.queryProgressMap[queryId]	= { progressValue: 0 };

		const request	= this._getRequest(method, url, data, responseType);

		return (this._httpClient.request(request) as any).pipe(
			
			map(event => this._getEventProgress(event, queryId)),

			tap(message => window.setTimeout(() => this._showProgress(message, queryId), 0)),

			last()
			
		)

		.toPromise()

		.then(this._handleSuccessResponse)

		.catch(this._handleFailedResponse)

		.finally(() => this._clearProgressEvent(queryId))

	}	

	private _clearProgressEvent(queryId: string): void {

		const map: { [key: string]: IProgressEvent }	= {};

		const queryProgressMap	= this.queryProgressMap;

		for (let key in queryProgressMap)

			if (key !== queryId)

				map[key] = queryProgressMap[key];

		this.queryProgressMap	= queryProgressMap;
		

	}

	private _getEventProgress(

		event:		any,

		queryId:	string,

		file?:		any

	): IProgressEvent {

		const previousProgressEvent	= this.queryProgressMap[queryId];

		this.queryProgressMap[queryId].progressValue	= (!file) ? 
		
			Math.round(100 * event.loaded / event.total) : previousProgressEvent.progressValue + 25;

		this.queryProgressMap[queryId].event			= event;

		return this.queryProgressMap[queryId];

	}

	private _getRequest(

		method: 		string,
		
		url:			string,

		data?:			string,

		responseType:	'arraybuffer'|'blob'|'json'|'text' 	= 'json'

	): HttpRequest<any> {

		return new HttpRequest(method, url, data, {

			headers:		new HttpHeaders(),

			responseType,

			reportProgress:	true

		});

	}

	private _handleFailedResponse(
		
		data:		any, 
		
		statusCode:	number
		
	): IQueryResponse {

		return { 
			
			response:	data.event, 
			
			status:		'Fail', 
			
			statusCode:	(statusCode != null) ? statusCode : data.event.status
		
		};

	}

	private _handleSuccessResponse(
		
		data:		any, 
		
		statusCode:	number
		
	): IQueryResponse {

		return { 
			
			response:	data.event, 
			
			status:		'Success', 
			
			statusCode:	(statusCode != null) ? statusCode : data.event.status
		
		};

	}

	private _showProgress(

		message:	any,

		queryId:	string

	): void {

		this._eventsService.changeMessage({ message: 'query:progress:update', event: queryId});

	}

}