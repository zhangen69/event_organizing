import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PageLoaderService {
    isLoad: boolean;
    private loaderListener = new Subject<boolean>();

    constructor() {}

    toggle(value?: boolean) {
        this.isLoad = value !== undefined ? value : !this.isLoad;
        this.loaderListener.next(this.isLoad);
    }

    getLoaderListener() {
        return this.loaderListener;
    }
}
