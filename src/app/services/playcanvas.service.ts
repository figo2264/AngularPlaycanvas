import {Injectable} from '@angular/core';
import * as pc from 'playcanvas';

@Injectable({
  providedIn: 'root',
})
export class PlaycanvasService{


  private _renderingContext: WebGL2RenderingContext | undefined | null;

  private get gl(): WebGLRenderingContext {
    return this._renderingContext as WebGLRenderingContext;
  }

  /**
   * Creates a new instance of the {@link WebGLService} class.
   */
  constructor() {
  }

  initWebGLContext(canvas: HTMLCanvasElement): void {
    this._renderingContext = canvas.getContext('webgl2', {preserveDrawingBuffer: true});

    // If we don't have a GL context, give up now... only continue if WebGL is available and working...
    if (!this.gl) {
      alert('Unable to initialize WebGL. Your browser may not support it.');
      return;
    }

    this.setWebGLCanvasDimensions(canvas);

    this.initWebGLCanvas(canvas);
  }

  // tslint:disable-next-line:typedef
  setWebGLCanvasDimensions(canvas: HTMLCanvasElement) {
    // set width and height based on canvas width and height - good practice to use clientWidth and clientHeight
    this.gl.canvas.width = canvas.clientWidth;
    this.gl.canvas.height = canvas.clientHeight;
  }

  initWebGLCanvas(canvas: HTMLCanvasElement) {
    const app = new pc.Application(canvas, {});
  }
}
