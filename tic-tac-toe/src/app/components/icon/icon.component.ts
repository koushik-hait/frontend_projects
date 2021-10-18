import { Component, OnInit, Input } from '@angular/core';
// faCircle
import { faCircle } from '@fortawesome/free-regular-svg-icons';
// faPen  , faTimes
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Input() iconName?: string;

  faPen = faPen;
  faCircle = faCircle;
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

}
