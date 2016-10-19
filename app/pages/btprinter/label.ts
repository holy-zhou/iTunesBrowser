import { IPrintContent } from './ticket';

declare var $GBK;

export class LabelCtrl implements IPrintContent {

  public X: number = 0; // 横坐标
  public Y: number = 0; // 纵坐标
  public Size: number = 3;
  public Zoom: number = 1; // 大小
  public Align: number = 0; // 对齐
  public Text: string = 'Text'; // 文本

  constructor(x: number, y: number, size: number, zoom: number, align: number, text?: string) { // 构造
    this.X = x;
    this.Y = y;
    this.Size = size;
    this.Align = align;
    this.Zoom = zoom;
    this.Text = text;
  }

  ToPrint(result: Array<number>): void {
    result.push(0x1d, 0x21, 0x00); // 取消缩放

    if (this.X > 0) {
      result.push(0x1b, 0x24); // 横坐标 X
      let x = this.X * 8;
      let xlow = x % 256;
      let xhigh = Math.floor(x / 256);
      result.push(xlow, xhigh);
    }

    if (this.Y > 0) {
      result.push(0x1d, 0x24); // 纵坐标 Y
      let y = this.Y * 8;
      let ylow = y % 256;
      let yhigh = Math.floor(y / 256);
      result.push(ylow, yhigh);
    }

    result.push(0x1b, 0x61); // 对齐
    result.push(this.Align);

    result.push(0x1b, 0x46); // 设置字体大小
    result.push(this.Size);

    // 设置字体缩放
    result.push(0x1d, 0x21);
    let z = this.Zoom - 1;
    let zz = '0x' + z + z;
    let v = parseInt(zz);
    result.push(v);

    // 输出内容
    for (let i = 0; i < this.Text.length; i++) {
      let c = this.Text.charAt(i);
      if (this.isChinese(c)) {
        let gbcode: string = $GBK.encode(c);
        gbcode.split('%').forEach((e) => {
          if (e !== '') {
            let v = parseInt('0x' + e);
            result.push(v);
          }

        });
      } else
        result.push(this.Text.charCodeAt(i));
    }
    result.push(0x0a);
  }

  isChinese(temp): boolean {
    var reg = /[^\u4e00-\u9fa5]/;
    return !(reg.test(temp));
  }
}
