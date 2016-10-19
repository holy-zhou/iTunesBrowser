import { IPrintContent } from './ticket';

export class BarcodeCtrl implements IPrintContent {

  public X: number = 0; // 横坐标
  public Y: number = 0; // 纵坐标
  public Height: number; // 高
  public Code: string = 'Code'; // 编码

  constructor(x: number, y: number, height: number, code?: string) {
    this.X = x;
    this.Y = y;
    this.Height = height;
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
    result.push(0x01); // Center 0:Left 1:Center 2:Right

    result.push(0x1d, 0x48); //  character print position
    result.push(0x02); // Below bar code 0:No 1:Above 2:Below 4:Above & Below

    result.push(0x1d, 0x68); //   bar code height
    let h = this.Height * 8;
    let hlow = h % 256;
    result.push(hlow);

    result.push(0x1d, 0x77); // bar code horizontal size
    result.push(0x02); // 1<=n<=6

    result.push(0x1d, 0x6b); // Print bar code
    result.push(0x49); // CODE128
    let len = this.Code.length + 2;
    result.push(len);
    result.push(0x7b, 0x42); // code128b

    // 输出内容
    for (let i = 0; i < this.Code.length; i++) {
      result.push(this.Code.charCodeAt(i));
    }

    result.push(0x0a);
  }
}
