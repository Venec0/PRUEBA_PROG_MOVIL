import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import jsQR, {QRCode} from 'jsqr';

@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.page.html',
  styleUrls: ['./qrreader.page.scss'],
})
export class QrreaderPage implements OnInit {

  @ViewChild('video', { static: false })
  private video!: ElementRef;

  @ViewChild('canvas', { static: false })
  private canvas!: ElementRef;

  public escaneando = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement | null = null;


  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    let w = 0 ;
    let h = 0 ;
    if (!source) {
     this.canvas.nativeElement.width = this.video.nativeElement.videoWidth; 
     this.canvas.nativeElement.height = this.video.nativeElement.videoHeight; 
    }

    w = this.canvas.nativeElement.width
    h = this.canvas.nativeElement.height

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source? source : this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    const qrCode: QRCode | null = jsQR(img.data, img.width, img.height, {inversionAttempts: 'dontInvert'});
    if (qrCode) {
      this.escaneando = false;
      this.datosQR = qrCode.data
    }

    return this.datosQR !== '';

  }

  public async comenzarEscaneoQR() {
    //this.limpiarDatos();
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    this.video.nativeElement.play();
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.escaneando = true;

      }
      if (this.obtenerDatosQR()){
        console.log('datos obtenidos');
      } else {
        if (this.escaneando) {
          console.log('escaneando...');
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {
      console.log('video aun no tiene datos')
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public detenerEscaneoQR(): void {
    this.escaneando= false;
  }

  public limpiarDatos() {
    this.escaneando = false;
    this.datosQR = '';
    this.loading = null;
    (document.getElementById('input-file') as HTMLInputElement).value = '';
  }

}
