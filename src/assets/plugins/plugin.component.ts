import { Component, NgModule, OnInit } from '@angular/core';


@Component({
    selector: 'app-plugin-cmp',
    template: `
        <article>
            <h1>Dynamic Module 🔥🔥🔥</h1>
            <div>{{ remark }} at {{ initDate | date:'HH:mm:ss' }}:{{ initDate % 1000 }}</div>
            <button (click)="onClick()" #innerContent>
                Click Me, I'm TREMENDOUSLY dynamic
            </button>
            <div *ngIf="false">
                Inside button: condition *ngIf false
            </div>
            <div *ngIf="true">
                Inside button: condition *ngIf true
            </div>
        </article>
    `
})
export class PluginComponent implements OnInit {
    remark: string = 'This is AWESOME!!';
    initDate: Date;

    ngOnInit() {
        this.initDate = new Date();
    }

    onClick() {
        console.log('[PluginComponent] Button clicked: ' + new Date());
    }
}
