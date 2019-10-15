import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class PageLoaderService {
    isLoad: boolean;
    private loaderListener = new Subject<boolean>();
    private onLoadDate: Date;

    constructor() { }

    toggle(value?: boolean): void {
        this.isLoad = value !== undefined ? value : !this.isLoad;
        if (this.isLoad === true) {
            this.onLoadDate = new Date();
        } else {
            const diff = moment().diff(moment(this.onLoadDate), 'milliseconds');
            const throttleTime = 1000;
            if (diff <= throttleTime) {
                setTimeout(() => {
                    this.onLoadDate = new Date();
                    this.loaderListener.next(this.isLoad);
                }, throttleTime - diff);
                return;
            }
        }
        this.loaderListener.next(this.isLoad);
    }

    getLoaderListener() {
        return this.loaderListener;
    }
}
