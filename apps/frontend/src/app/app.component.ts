import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  selector: 'users-central-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  showButton = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.showButton = evt.url === '' || evt.url === '/';
      }
    }
    );
  }
}
