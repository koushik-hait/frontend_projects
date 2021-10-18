import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tic-tac-toe';
  winMessage: string = '';
  isCross: boolean = false;
  itemArray: string[] = new Array(9).fill('empty')
  constructor(private toastr: ToastrService) { }

  handleClick = (itemNumber: number) => {
    if (this.winMessage) {
      return this.toastr.success(this.winMessage);

    }
    if (this.itemArray[itemNumber] === 'empty') {
      this.itemArray[itemNumber] = this.isCross ? 'cross' : 'circle';

      this.isCross = !this.isCross
    } else {
      return this.toastr.warning('Already filled')
    }

    this.checkIsWinner()
  }

  checkIsWinner = () => {
    if (
      this.itemArray[0] === this.itemArray[1] &&
      this.itemArray[0] === this.itemArray[2] &&
      this.itemArray[0] !== 'empty'
    ) {
      this.winMessage = `${this.itemArray[0]} is the Winner`
    } else if (
      this.itemArray[3] === this.itemArray[4] &&
      this.itemArray[3] === this.itemArray[5] &&
      this.itemArray[3] !== 'empty'
    ) {
      this.winMessage = `${this.itemArray[3]} is the Winner`
    } else if (
      this.itemArray[6] === this.itemArray[7] &&
      this.itemArray[6] === this.itemArray[8] &&
      this.itemArray[6] !== 'empty'
    ) {
      this.winMessage = `${this.itemArray[6]} is the Winner`
    } else if (
      this.itemArray[0] === this.itemArray[3] &&
      this.itemArray[0] === this.itemArray[6] &&
      this.itemArray[0] !== 'empty'
    ) {
      this.winMessage = `${this.itemArray[0]} is the Winner`
    } else if (
      this.itemArray[1] === this.itemArray[4] &&
      this.itemArray[1] === this.itemArray[7] &&
      this.itemArray[1] !== 'empty'
    ) {
      this.winMessage = `${this.itemArray[1]} is the Winner`
    } else if (
      this.itemArray[2] === this.itemArray[5] &&
      this.itemArray[2] === this.itemArray[8] &&
      this.itemArray[2] !== 'empty'
    ) {
      this.winMessage = `${this.itemArray[2]} is the Winner`
    } else if (
      this.itemArray[0] === this.itemArray[4] &&
      this.itemArray[0] === this.itemArray[8] &&
      this.itemArray[0] !== 'empty'
    ) {
      this.winMessage = `${this.itemArray[0]} is the Winner`
    } else if (
      this.itemArray[2] === this.itemArray[4] &&
      this.itemArray[2] === this.itemArray[6] &&
      this.itemArray[2] !== 'empty'
    ) {
      this.winMessage = `${this.itemArray[2]} is the Winner`
    } else if (this.itemArray.every(v => v !== 'empty')) {
      this.winMessage = `it\'s a draw`

    }
    //  else {
    //   this.winMessage = 'Its a draw'
    // }
  }

  reloadGame = () => {
    this.winMessage = '';
    this.isCross = false
    this.itemArray = new Array(9).fill('empty')
  }
}
