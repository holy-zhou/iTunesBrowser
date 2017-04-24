import { IPrintContent } from './ticket';

declare var $GBK;

export class QRcodeCtrl implements IPrintContent {

  public X: number = 0; // 横坐标
  public Y: number = 0; // 纵坐标
  public Version:number=0; // 版本
  public ECC:number=1; // ECC
  public UnitWidth: number = 4; // 粗细
  public Rotate:number=0; //旋转
  public Code: string = 'Code'; // 编码

  constructor(x: number, y: number, version: number, ecc:number,unitWidth:number,rotate:number,code?: string) {
    this.X = x;
    this.Y = y;
    this.Version = version;
    this.ECC=ecc;
    this.UnitWidth=unitWidth;
    this.Rotate=rotate;
    this.Code = code;
  }
  ToPrint(result: Array<number>): void {

    // BEGIN 
    result.push(26, 49, 0);

    // Version ECC
    result.push(this.Version&255, this.ECC & 255);

    // X,Y
    result.push(this.X&255,this.X>>8&255,this.Y&255,this.Y>>8&255);

    // UW, R
    result.push(this.UnitWidth&255,this.Rotate&255)
    
    // 输出内容
    for (let i = 0; i < this.Code.length; i++) {
        let c = this.Code.charAt(i);
      if (this.isChinese(c)) {
        let gbcode: string = $GBK.encode(c);
        gbcode.split('%').forEach((e) => {
          if (e !== '') {
            let v = parseInt('0x' + e);
            result.push(v);
          }
        });
      } else
        result.push(this.Code.charCodeAt(i));
    }

     // END
    result.push(0);
  }

   isChinese(temp): boolean {
    var reg = /[^\u4e00-\u9fa5]/;
    return !(reg.test(temp));
  }
}
