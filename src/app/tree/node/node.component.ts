import { Component, Input, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { TransferDataService } from 'src/app/core/services/transfer-data.service';

@Component({
  selector: 'app-node,[app-node]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  message:string = "";

  @Input() public tree: any;
  @Input() liWidth: any;
  constructor(private data: TransferDataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(mess => this.message = mess);
  }

  isShow(arr: Array<any>){
    return (arr.findIndex(x=> x.showView == false) >-1);
  }

  newMess(){
    this.data.changeMessage("aaaa");
  }

 showAllChild(){
  for(var i=0; i<this.tree.childView.length; i++){
    this.tree.childView[i].showView = true;
    console.log(this.tree.childView);
  }
  this.data.changeMessage("aaaa");
  }
  

}
