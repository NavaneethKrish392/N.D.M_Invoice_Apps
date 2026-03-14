import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-header',
    imports: [MatToolbarModule, MatButtonModule, MatMenuModule],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    standalone: true,
})
export class Header {}
