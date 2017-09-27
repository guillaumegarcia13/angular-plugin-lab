import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-my-button',
    template: `
        <button (click)="onClick()">
            Click Me
        </button>`
})
export class MyButtonComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    onClick() {
        console.log('Button clicked: ' + new Date());
    }

}
