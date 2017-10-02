import { Component, NgModule, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-test',
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
export class TestComponent implements OnInit {
    remark: string = 'This is AWESOME!!';
    initDate;

    ngOnInit() {
        this.initDate = new Date();
    }

    onClick() {
        console.log('[TestComponent] Button clicked: ' + new Date());
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [TestComponent],
    declarations: [TestComponent],
    entryComponents: [TestComponent]
})
export class TestModule {
    static entry = TestComponent;
}
