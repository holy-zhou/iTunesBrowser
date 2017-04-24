import { IPrintContent } from './ticket';


export class LineCtrl implements IPrintContent {

  public X1: number = 0; // 横坐标
  public Y1: number = 0; // 纵坐标
  public X2: number = 0;
  public Y2:number=0;
  public UnitWidth:number=1;
  public Color:number=0;

  constructor(x1: number, y1: number,x2: number, y2: number,unitWidth:number,color:number) { // 构造
    this.X1 = x1;
    this.Y1 = y1;
    this.X2=x2;
    this.Y2=y2;
    this.UnitWidth = unitWidth;
    this.Color = color;
  }

  ToPrint(result: Array<number>): void {
    // BEGIN
    result.push(26,92,1);

    // X1,Y1
    result.push(this.X1&255,this.X1>>8&255,this.Y1&255,this.Y1>>8&255);
    
     // X2,Y2
    result.push(this.X2&255,this.X2>>8&255,this.Y2&255,this.Y2>>8&255);

    // UW Color
    result.push(this.UnitWidth&255,this.UnitWidth>>8&255,this.Color&255);

    
  }

 
}
