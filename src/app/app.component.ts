import {AfterViewInit, Component, OnInit} from '@angular/core';
import {scripts} from './scripts/script-asset';
import * as pc from 'playcanvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  orbitCamera: any;
  ngOnInit(): void {
    const canvas = document.getElementById('application-canvas') as HTMLCanvasElement;
    canvas.getContext('webgl2', {preserveDrawingBuffer: true});

    if (!canvas) {
      return;
    }

    const app = new pc.Application(canvas, {
      mouse: new pc.Mouse(canvas),
      keyboard: new pc.Keyboard(window),
    });

    const materialAssetManifest = scripts;
    let assetsToLoad = materialAssetManifest.length;
    materialAssetManifest.forEach((entry) => {
      app.assets.loadFromUrl(entry.url, entry.type, (err, asset) => {

        if (!err && asset) {
          assetsToLoad--;
          // entry[asset] = asset;
          // @ts-ignore
          entry.asset = asset;

          if (assetsToLoad === 0) {
            this.addOrbitScript();
          }
        }
      });
    });
  }

  addOrbitScript() {
    this.orbitCamera.addComponent('script');
    this.orbitCamera.script.create('orbitCamera', {
      attributes: {
        inertiaFactor: 0.087, // Override default of 0 (no inertia)
        distanceMin: 2.9,
        distanceMax: 10,
        pitchAngleMin: -2.2,
      }
    });
    this.orbitCamera.script.create('orbitCameraInputMouse');
    this.orbitCamera.script.create('orbitCameraInputTouch');
    this.orbitCamera.script.orbitCamera.distance = 5;
  }

}
