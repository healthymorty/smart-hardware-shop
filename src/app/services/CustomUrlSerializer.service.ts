import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';

export class CustomUrlSerializerService implements UrlSerializer {

	private _defaultSerializer: DefaultUrlSerializer;

	constructor() {

		this._defaultSerializer	= new DefaultUrlSerializer();

	}

	private _decode(URIComponent: string): string {

		if (this._isEncoded(URIComponent)) {

			return this._decode(decodeURIComponent(URIComponent));

		} else {

			return URIComponent.replace(/\s/g, '_').replace(/.*\/$/m, ''); //URIComponent;

		}

	}

	private _isEncoded(URIComponent: string): boolean {

		return /%[0-9a-f]{2}/i.test(URIComponent);

	}

	public parse(URL: any): UrlTree {

		if (URL.indexOf('(') !== -1) URL = URL.replace('(', '%28').replace(')', '%29');

		return this._defaultSerializer.parse(URL);

	}

	public serialize(tree: UrlTree): any {

		return this._decode(this._defaultSerializer.serialize(tree));

	}

}
