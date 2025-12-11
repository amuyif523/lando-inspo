declare module "three/examples/jsm/postprocessing/EffectComposer" {
  import { WebGLRenderer, WebGLRenderTarget, Scene, Camera } from "three";
  export class EffectComposer {
    constructor(renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget);
    addPass(pass: any): void;
    render(delta?: number): void;
    setSize(width: number, height: number): void;
    dispose(): void;
    passes: any[];
  }
}

declare module "three/examples/jsm/postprocessing/RenderPass" {
  import { Scene, Camera } from "three";
  export class RenderPass {
    constructor(scene: Scene, camera: Camera);
  }
}

declare module "three/examples/jsm/postprocessing/BokehPass" {
  import { Scene, Camera } from "three";
  export class BokehPass {
    constructor(scene: Scene, camera: Camera, params: { focus: number; aperture: number; maxblur: number });
  }
}

declare module "three/examples/jsm/postprocessing/ShaderPass" {
  export class ShaderPass {
    constructor(shader: any);
    uniforms: Record<string, { value: any }>;
  }
}

declare module "three/examples/jsm/shaders/RGBShiftShader" {
  export const RGBShiftShader: any;
}
