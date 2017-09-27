import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OnMount } from 'ng-dynamic';

@Component({
    selector: 'app-highly-dyn-button',
    template: `
        <button (click)="onClick()" #innerContent>
          Click Me, I'm HIGHLY dynamic
        </button>
        <div *ngIf="false">
            Inside button: condition *ngIf false
        </div>
        <div *ngIf="true">
            Inside button: condition *ngIf true
        </div>
    `
})
export class HighlyDynamicButtonComponent implements OnMount, OnInit {
    @ViewChild('innerContent') innerContent: ElementRef;

    constructor() { }

    dynamicOnMount(attr: Map<string, string>, content: string) {
        console.log('[HighlyDynamicButtonComponent] This should only show when used in a DynamicHTMLModule!!');
    }

    ngOnInit() {
        console.log('[HighlyDynamicButtonComponent] Inited at ' + new Date());
    }

    onClick() {
        console.log('[HighlyDynamicButtonComponent] Button clicked: ' + new Date());
    }

}
