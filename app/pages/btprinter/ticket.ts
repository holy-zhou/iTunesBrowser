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
    this.PrintContent.push(new LabelCtrl(1, 5, 3, 1, 0, '产品名称:1x5y 3*1'));
    this.PrintContent.push(new LabelCtrl(2, 10, 3, 2, 0, '规格:2x10y 3*2'));
    this.PrintContent.push(new LabelCtrl(3, 15, 3, 3, 0, '毛重:3x15y 3*3'));
    this.PrintContent.push(new LabelCtrl(4, 20, 5, 1, 0, '地址:4x20y 5*1'));
    this.PrintContent.push(new LabelCtrl(5, 30, 5, 2, 0, '日期:5x30y 5*2'));
    this.PrintContent.push(new LabelCtrl(6, 35, 5, 3, 0, '摊主:6x35y 5*3'));
    this.PrintContent.push(new LabelCtrl(1, 40, 3, 1, 0, 'BC:1x60y 15h'));
    this.PrintContent.push(new LabelCtrl(1, 65, 3, 1, 0, 'QR:30x15y 4*'));

    this.PrintContent.push(new BarcodeCtrl(1, 60, 15, 'SO20161017001'));
    this.PrintContent.push(new QRcodeCtrl(30, 15, 4, 'http://www.jointech.cn/query?so=SO20161017001'));
  }
  Print(mac: string): Promise<string> {

    let result: Promise<string> = new Promise<string>((resolve, reject) => {
      BluetoothSerial.connect(mac).subscribe((e) => {
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

  // 生成打印区域设置
  BuildPrintArea(): void {

    // 设置页模式 1b 4c
    this.Result.push(0x1b, 0x4c);

    // 设置页面大小 1b 57 00 00 00 00 80 01 30 01
    this.Result.push(0x1b, 0x57);

    // 打印区坐标 0,0
    this.Result.push(0x00, 0x00, 0x00, 0x00);
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
    this.Result.push(0x1b, 0x54);
    this.Result.push(0x00);

    this.Result.push(0x0a);
  }
}
