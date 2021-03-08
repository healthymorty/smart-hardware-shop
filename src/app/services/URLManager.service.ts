import { Injectable }	from '@angular/core';

import { Location }		from '@angular/common';

import {

	ActivatedRoute,

	Params,

	Router,

	UrlTree

}	from '@angular/router';

import { CustomUrlSerializerService }	from './CustomUrlSerializer.service';

@Injectable()

export class URLManagerService {

	static GLOBAL_CONTEXT		= '/';

	static EXTERNAL_APP_ID:		string;

	get appExists(): boolean {

		const appId	= this.hasOptionalParam('appId');

		return appId ||  !appId && ['incremental-vs-last-touch', 'optimizations', 'app-options'].indexOf(this.getDataValue('pageName')) === -1;

	}

	get defaultOptionalParams(): string[] {

		return [this.getOptionalParam('appName'), this.getOptionalParam('appId')];

	}

	private _lastOptionalParams?:	string[] = [];

	get lastOptionalParams(): string[] {

		return this._lastOptionalParams!;

	}

	set lastOptionalParams(optionalParams: string[]) {

		this._lastOptionalParams	= optionalParams.filter((optionalParam) => ['appName', 'appId'].indexOf(optionalParam) === -1);

	}

	public lastQueryParams?: Params;

	get queryParams(): Params {

		const parentRoute	= this.activatedRoute.firstChild;

		const snapshot		= parentRoute && parentRoute.firstChild && parentRoute.firstChild.snapshot;

		const queryParams	= (snapshot && snapshot.queryParams) ? snapshot.queryParams : {};

		const externalNavQueryParams	= (snapshot && snapshot.data.queryParams) ? snapshot.data.queryParams : {};

		return {...queryParams, ...externalNavQueryParams};

	}

	get optionalParamsMap(): { [key: string]: any; } {

		const parentRoute	= this.activatedRoute.firstChild;

		const snapshot		= parentRoute && parentRoute.firstChild && parentRoute.firstChild.snapshot;

		return  (snapshot && snapshot.params) ? snapshot.params : {};

	}

	get optionalParams(): string[] {

		const optionalParams	= [];

		for (let paramName in this.optionalParamsMap) optionalParams.push(paramName, this.optionalParamsMap[paramName]);

		return optionalParams;

	}

	public URLSerializer	= new CustomUrlSerializerService();

	constructor(

		private activatedRoute:	ActivatedRoute,

		private location:		Location,

		private router:			Router

	) {}

	public clearQueryParam(queryParam: string): void {

		const resetFilter:	{ [key: string]: string } = {};

		resetFilter[queryParam]	= '';

		this.updateURLFromParams(resetFilter);

		const params	= this.queryParams;

		let queryParams	= '?';

		for (let key in params) {

			if (key !== queryParam)

				queryParams	+= ((queryParams === '?') ? '' : '&') + key + '=' + params[key];

		}

		const URL	= this.router.url.split('?')[0] + queryParams;

		this.updateURLNoReload(URL);

	}

	public createUrlTree(optionsParams?: any[], queryParams?: { [key: string]: string }, preserveFragment = true): UrlTree {

		if (optionsParams) this.lastOptionalParams	= optionsParams.filter((param) => ['appName', 'appId'].indexOf(param) === -1);

		if (queryParams) this._updateExternalQueryParams(queryParams);

		return this.router.createUrlTree([

				URLManagerService.GLOBAL_CONTEXT.replace('/', ''),

				this.getDataValue('pageName'),

				...this.lastOptionalParams,

			],

			{

				queryParams:			this.queryParams,

				queryParamsHandling:	'merge',

				preserveFragment,

				relativeTo:				this.activatedRoute

			}

		);

	}

	public getDataValue(prop: string): string {

		return (this.hasDataProp(prop)) ? this.activatedRoute!.firstChild!.firstChild!.snapshot.data[prop] : '';

	}

	public getOptionalParam(optionalParam: string): any {

		return (this.hasOptionalParam(optionalParam)) ? this.optionalParamsMap[optionalParam] : null;

	}

	public getQueryParam(queryParamName: string): string {

		return (this.hasQueryParam(queryParamName)) ? this.queryParams[queryParamName] : null;

	}

	public hasDataProp(prop: string): boolean {

		let parentRoute = this.activatedRoute.firstChild;

		return (parentRoute && parentRoute.firstChild && parentRoute.firstChild.snapshot && parentRoute.firstChild.snapshot.data[prop]); //.routeConfig.data['state']);   //.snapshot && parentRoute.firstChild.snapshot.params[param]);

	}

	public hasOptionalParam(optionalParam: string): boolean {

		return (this.optionalParamsMap.hasOwnProperty(optionalParam));

	}

	public hasQueryParam(queryParam: string): boolean {

		return (this.queryParams.hasOwnProperty(queryParam));

	}

	public navigate(url: string): void {

		this.router.navigateByUrl(url);

	}

	public queryParamExists(paramName: string, value: string): boolean {

		return this.getQueryParam(paramName) === value;

	}

	public paramsToURL(

		queryParams?: { [key: string]: any },

		optionalParams?: any[], caller?: string

	): string {

		return this.URLTreeToURL(this.createUrlTree(optionalParams, queryParams));

	}

	public updateURLFromParams(

		queryParams?:		{ [key: string]: any },

		optionalParams?:	any[], caller?: string,

		reload				= false

	): void {

		const url	= this.paramsToURL(queryParams, optionalParams);

		if (!reload) this.updateURLNoReload(url);

	}

	public updateURLNoReload(url: string): void {

		this.location.go(url);

	}

	private _updateExternalQueryParams(queryParams: {[key: string]: any}): void {

		const parentRoute = this.activatedRoute.firstChild;

		const snapshot		= parentRoute && parentRoute.firstChild && parentRoute.firstChild.snapshot;

		if (snapshot) {

			for (let paramName in queryParams) snapshot.data.queryParams[paramName]	= queryParams[paramName];

		}

	}

	public URLTreeToURL(URlTree: UrlTree): string {

		return this.URLSerializer.serialize(URlTree);

	}

}
