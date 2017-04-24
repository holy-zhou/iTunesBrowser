import { BluetoothSerial } from 'ionic-native';
import { LabelCtrl } from './label';
import { BarcodeCtrl } from './barcode';
import { QRcodeCtrl } from './qrcode';

export interface IPrintContent {
  ToPrint(result: Array<number>): void;
}
export class TicketModel {
  public Width: number = 55;
  public Height: number = 75;

  public PrintContent: Array<IPrintContent>;

  public Result: Array<number> = new Array<number>();
  constructor() {
    this.PrintContent = new Array<IPrintContent>();
    this.PrintContent.push(this.CreateLabel(10, 50, 24, '产品名称:10:50:24'));
    this.PrintContent.push(this.CreateLabel(20, 100,24, '规格:20:100:24'));
    this.PrintContent.push(this.CreateLabel(30, 150, 24, '毛重:30:150:24'));
    this.PrintContent.push(this.CreateLabel(40, 200, 40, '地址:40:200:40'));
    this.PrintContent.push(this.CreateLabel(50, 300, 40, '日期:50:300:50'));
    this.PrintContent.push(this.CreateLabel(10, 400, 24, 'BC:10:600:50'));
    this.PrintContent.push(this.CreateLabel(10, 650, 24, 'QR:300:150:4'));

    this.PrintContent.push(this.CreateBarcode(10, 600, 50, 'SO20161017001'));
    this.PrintContent.push(this.CreateQRcode(300, 150, 4, 'http://www.jointech.cn/query?so=SO20161017001'));
  }

  CreateLabel(x:number,y:number,size:number,text:string):LabelCtrl{
    let style=0;
    let label=new LabelCtrl(x,y,size,style,text);
    return label;
  }

  CreateBarcode(x:number,y:number,height:number,code:string):BarcodeCtrl{
    let type=4; //Code39
    let unitWidth=2;
    let roate=0;
    let barcode=new BarcodeCtrl(x,y,type, height,unitWidth,roate,code);
    return barcode;
  }

  CreateQRcode(x:number, y:number, unitWidth:number,code:string):QRcodeCtrl{
    let version=0;
    let ecc=1;
    let roate=0;
    let qrcode=new QRcodeCtrl(x,y,version,ecc,unitWidth,roate,code)
    return qrcode;
  }
  Print(mac: string): Promise<string> {

    let result: Promise<string> = new Promise<string>((resolve, reject) => {
      BluetoothSerial.connect(mac).subscribe((e) => {
        this.PageBegin(0,0,this.Width,this.Height,1);

        this.BuildPrintArea();
        this.PrintContent.forEach((e) => {
          e.ToPrint(this.Result);
        });
        this.Result.push(0x0c);
        BluetoothSerial.write(new Uint8Array(this.Result)).then((e) => {
          let hexResult = new Array<string>();
          this.Result.forEach((e) => {
            hexResult.push(e.toString(16));
          });
          resolve(hexResult.join('|'));
        }, (err) => { reject('write error' + err); });
      }, (err) => { reject('connect error' + err); });
    });

    return result;

  }
  
  // X,Y 坐标 W,H 宽高 R 旋转
  PageBegin(x,y,w,h,r):void{
    this.Result.push(26,91,1,x&255,x>>8&255,y&255,y>>8>>255,w&255,w>>8&255,h&255,h>>8&255,r&255)
  }

  // 生成打印区域设置
  BuildPrintArea(): void {

    // PageEnter
    this.Result.push(29,80,-56,-56,27,76,27,51,0);

    // // 设置页模式 1b 4c
    // this.Result.push(0x1b, 0x4c);

 // 打印区坐标 0,0
    // this.Result.push(0x00, 0x00, 0x00, 0x00);

    // 设置页面大小 1b 57 00 00 00 00 80 01 30 01
    this.Result.push(27, 87,0,0,0,0);

   
    // this.Result.push(0x80, 0x01, 0x30, 0x01);
    // 打印区宽
    let w = this.Width * 8;
    let wlow = w % 256;
    let whigh = Math.floor(w / 256);
    this.Result.push(wlow, whigh);

    // 打印区高
    let h = this.Height * 8;
    let hlow = h % 256;
    let hhigh = Math.floor(h / 256);
    this.Result.push(hlow, hhigh);

    // 设置纵向打印 Left to Right
    this.Result.push(27, 84);
    this.Result.push(0x00);

    // this.Result.push(0x0a);
  }
}
