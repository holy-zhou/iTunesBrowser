import { IPrintContent } from './ticket';

export class QRcodeCtrl implements IPrintContent {

  public X: number = 0; // 横坐标
  public Y: number = 0; // 纵坐标
  public Size: number = 3;
  public Code: string = 'Code'; // 编码

  constructor(x: number, y: number, size: number, code?: string) {
    this.X = x;
    this.Y = y;
    this.Size = size;
    this.Code = code;
  }
  ToPrint(result: Array<number>): void {

    result.push(0x1d, 0x21, 0x00); // 取消缩放

    result.push(0x1b, 0x24); // 横坐标 X
    let x = this.X * 8;
    let xlow = x % 256;
    let xhigh = Math.floor(x / 256);
    result.push(xlow, xhigh);


    result.push(0x1d, 0x24); // 纵坐标 Y
    let y = this.Y * 8;
    let ylow = y % 256;
    let yhigh = Math.floor(y / 256);
    result.push(ylow, yhigh);

    result.push(0x1b, 0x61); // Position alignment
    result.push(0x00); // Center 0:Left 1:Center 2:Right

    result.push(0x1d, 0x6f); // Size
    result.push(0x00, this.Size);
    result.push(0x00, 0x02);

    result.push(0x1d, 0x6b); // Print code
    result.push(0x4b); // GS1
    let len = this.Code.length + 2;
    result.push(len);
    result.push(0x31, 0x32); // code128b

    // 输出内容
    for (let i = 0; i < this.Code.length; i++) {
      result.push(this.Code.charCodeAt(i));
    }

    result.push(0x0a);
  }
}
