export default class Object extends Laya.Scene {
    constructor() {
        super();
        // box 一个主角物体
        var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.4, 0.4, 0.4)))
        box.transform.translate(new Laya.Vector3(0, 2, -2));
        box.transform.rotate(new Laya.Vector3(45, 45, 45), false, false);

        // 产生阴影
        box.meshRenderer.castShadow = true;
        box.meshRenderer.material = new Laya.BlinnPhongMaterial(new Laya.Vector4(3, 6, 2, 1));
    }
}