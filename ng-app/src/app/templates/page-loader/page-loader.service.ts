import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class PageLoaderService {
    isLoad: boolean;
    private loaderListener = new Subject<boolean>();
    private lastUpdate: Date;

    constructor() { }

    toggle(value?: boolean): void {
        this.isLoad = value !== undefined ? value : !this.isLoad;
        if (this.isLoad === true) {
            this.lastUpdate = new Date();
        } else {
            const diff = moment().diff(moment(this.lastUpdate), 'milliseconds');
            const throttleTime = 1000;
            if (diff <= throttleTime) {
                const timeout = throttleTime - diff;
                setTimeout(() => {
                    this.lastUpdate = new Date();
                    this.loaderListener.next(this.isLoad);
                }, timeout);
                return;
            }
        }

        this.loaderListener.next(this.isLoad);
    }

    getLoaderListener() {
        return this.loaderListener;
    }
}
