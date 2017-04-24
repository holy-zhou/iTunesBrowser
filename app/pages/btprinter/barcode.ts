import { IPrintContent } from './ticket';

export class BarcodeCtrl implements IPrintContent {

  public X: number = 0; // 横坐标
  public Y: number = 0; // 纵坐标
  public Type: number = 8; //类型
  public Height: number; // 高
  public UnitWidth: number = 2; //粗细
  public Rotate: number = 0; // 旋转
  public Code: string = 'Code'; // 编码


  constructor(x: number, y: number,type:number, height: number, unitWidth: number, rotate: number, code?: string) {
    this.X = x;
    this.Y = y;
    this.Type=type;
    this.Height = height;
    this.UnitWidth = unitWidth;
    this.Rotate = rotate;
    this.Code = code;
  }

  ToPrint(result: Array<number>): void {
    // BEGIN
    result.push(26, 48, 0);

    // X,Y
    result.push(this.X & 255, this.X >> 8 & 255, this.Y & 255, this.Y >> 8 & 255);

    // Type
    result.push(this.Type & 255);

    // H UW R
    result.push(this.Height & 255, this.UnitWidth & 255, this.Rotate & 255); // Center 0:Left 1:Center 2:Right

    // 输出内容
    for (let i = 0; i < this.Code.length; i++) {
      result.push(this.Code.charCodeAt(i));
    }

    // END
    result.push(0);
  }
}
