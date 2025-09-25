import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-foundpage',
  templateUrl: './foundpage.component.html',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  styleUrls: ['./foundpage.component.scss']
})
export class FoundpageComponent {

}
