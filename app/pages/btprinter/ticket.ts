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
    this.PrintContent.push(this.CreateLabel(20, 100, 24, '规格:20:100:24'));
    this.PrintContent.push(this.CreateLabel(30, 150, 24, '毛重:30:150:24'));
    this.PrintContent.push(this.CreateLabel(40, 200, 40, '地址:40:200:40'));
    this.PrintContent.push(this.CreateLabel(50, 300, 40, '日期:50:300:50'));
    this.PrintContent.push(this.CreateLabel(10, 400, 24, 'BC:10:600:50'));
    this.PrintContent.push(this.CreateLabel(10, 650, 24, 'QR:300:150:4'));
    this.PrintContent.push(this.CreateBarcode(10, 600, 50, 'SO20161017001'));
    this.PrintContent.push(this.CreateQRcode(300, 150, 4, 'http://www.jointech.cn/query?so=SO20161017001'));
  }

  CreateLabel(x: number, y: number, size: number, text: string): LabelCtrl {
    let style = 0;
    let label = new LabelCtrl(x, y, size, style, text);
    return label;
  }

  CreateBarcode(x: number, y: number, height: number, code: string): BarcodeCtrl {
    let type = 4; //Code39
    let unitWidth = 2;
    let roate = 0;
    let barcode = new BarcodeCtrl(x, y, type, height, unitWidth, roate, code);
    return barcode;
  }

  CreateQRcode(x: number, y: number, unitWidth: number, code: string): QRcodeCtrl {
    let version = 0;
    let ecc = 1;
    let roate = 0;
    let qrcode = new QRcodeCtrl(x, y, version, ecc, unitWidth, roate, code)
    return qrcode;
  }

  PageBegin(x, y, w, h, r): void {
    //HEAD
    this.Result.push(26, 91, 1);

    // X Y
    this.Result.push(x & 255, x >> 8 & 255, y & 255, y >> 8 >> 255);

    // W H R
    this.Result.push(w & 255, w >> 8 & 255, h & 255, h >> 8 & 255, r & 255)
  }

  PageEnd(): void {
    //HEAD
    this.Result.push(26, 93, 0);
  }

  PagePrint():void{
    //HEAD
    this.Result.push(26,79,1,1);
  }

  Print(mac: string): Promise<string> {

    let result: Promise<string> = new Promise<string>((resolve, reject) => {
      BluetoothSerial.connect(mac).subscribe((e) => {
        this.PageBegin(0, 0, this.Width, this.Height, 1);

        this.PrintContent.forEach((e) => {
          e.ToPrint(this.Result);
        });


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
}
