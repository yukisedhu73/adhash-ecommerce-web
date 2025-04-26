import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from "./components/top-bar/top-bar.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TopBarComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'adhash-ecommerce-fe';
}
