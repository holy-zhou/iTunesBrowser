import { IPrintContent } from './ticket';


export class RectangelCtrl implements IPrintContent {

  public Left: number = 0; // 横坐标
  public Top: number = 0; // 纵坐标
  public Right: number = 0;
  public Bottom:number=0;
  public Color:number=0;

  constructor(left: number, top: number,right: number, bottom: number,color:number) { // 构造
    this.Left=left;
    this.Top = top;
    this.Right=right;
    this.Bottom=bottom;
    this.Color = color;
  }

  ToPrint(result: Array<number>): void {
    // BEGIN
    result.push(26,42,0);

    // X1,Y1
    result.push(this.Left&255,this.Left>>8&255,this.Top&255,this.Top>>8&255);
    
     // X2,Y2
    result.push(this.Right&255,this.Right>>8&255,this.Bottom&255,this.Bottom>>8&255);

    // Color
    result.push(this.Color&255);
    
  }

 
}
