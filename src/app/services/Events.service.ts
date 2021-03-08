import { Injectable }       from '@angular/core';

import { BehaviorSubject }  from 'rxjs';

@Injectable()

export class EventsService {

    static instance: EventsService;

    private _dataSource     = new BehaviorSubject<{ message: string, event: any}>({ message: 'default message', event: null });

    public currentMessage   = this._dataSource.asObservable();

    constructor() {

        EventsService.instance   = this;

    }

    public changeMessage(data: { message: string, event: any}) {

        this._dataSource.next(data);

    }

}