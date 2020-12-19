import { Component, OnInit } from '@angular/core';
import * as jsonData from '../../assets/tree-data.json';
import { TransferDataService } from '../core/services/transfer-data.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  constructor(private data: TransferDataService) { }

  message: string = "";

  title = 'family-tree';
  list: any;
  myicon!: HTMLElement | undefined;
  mypopup!: HTMLElement | null;
  public dataJSONFile: any = jsonData.data;

  ngOnInit(): void {

    this.dataJSONFile = jsonData.data;
    this.list = [];
    this.list = this.arrToTree(this.dataJSONFile)[0];
    this.data.currentMessage.subscribe(mess => {
      this.message = mess;
      let treeView = document.getElementById("tree");
      if (treeView) {
        treeView.style.width = "200000px";
        treeView.style.height = "200000px";

      }
    })
  }
  ngAfterViewInit() {
  }
  ngAfterViewChecked(){
    let firstLi = document.getElementById("firstLi");
    let treeView = document.getElementById("tree");

    

    if (treeView&&firstLi) {
      if (firstLi.offsetWidth < window.innerWidth) {
        firstLi.style.marginLeft = ((window.innerWidth - firstLi.offsetWidth) / 2) + "px";
        treeView.style.width =window.innerWidth +"px";
        treeView.style.height =window.innerHeight +"px";
      } else {
        firstLi.style.marginLeft = "0px";
        treeView.style.width =  firstLi.offsetWidth + "px";
        treeView.style.height =  firstLi.offsetHeight + "px";
      }
    }
  }

  showPopup(evt: any) {
    let element = evt.target;
    let xPosition = 0;
    let yPosition = 0;
    let width = evt.target.offsetWidth;
    while (element) {
      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
      yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
      element = element.offsetParent;
    }

    this.mypopup = document.getElementById("mypopup");
    if (this.mypopup) {
      this.mypopup.style.left = (xPosition + width) + "px";
      this.mypopup.style.top = (yPosition) + "px";
      this.mypopup.style.display = "Inline";
    }

  }

  hidePopup(evt: any) {
    if (this.mypopup) {
      this.mypopup.style.display = "none";
    }
  }
  arrToTree(arr: any) {
    let array = arr;
    let map = [];
    let root = [];
    for (var i = 0; i < array.length; i++) {
      map[array[i].Id] = i + 1;
      array[i].childView = [];
    }

    for (var i = 0; i < array.length; i++) {

      if (map[array[i].Father]) {
        let a = array[i];
        array[map[array[i].Father] - 1].childView.push(array[i]);
      } else {
        if (array[i].Id == "51b98fb8-4b0e-44e0-b69b-8deea6107442") {
          root.push(array[i]);
        }
      }

    }

    return root;
  }
}
