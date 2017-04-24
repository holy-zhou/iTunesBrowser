import { IPrintContent } from './ticket';

declare var $GBK;

export class LabelCtrl implements IPrintContent {

  public X: number = 0; // 横坐标
  public Y: number = 0; // 纵坐标
  public Size: number = 24;
  public Style:number=0;
  public Text: string = 'Text'; // 文本

  constructor(x: number, y: number, size: number, style: number,  text?: string) { // 构造
    this.X = x;
    this.Y = y;
    this.Size = size;
    this.Style = style;
    this.Text = text;
  }

  ToPrint(result: Array<number>): void {
    // BEGIN
    result.push(26,84,1);

    // X,Y
    result.push(this.X&255,this.X>>8&255,this.Y&255,this.Y>>8&255);

    // Size Style
    result.push(this.Size&255,this.Size>>8&255,this.Style&255,this.Style>>8&255);

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
    
    // END
    result.push(0);
  }

  isChinese(temp): boolean {
    var reg = /[^\u4e00-\u9fa5]/;
    return !(reg.test(temp));
  }
}
