/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
import CameraMoveScript from "./CameraMoveScript";
// import Object from "./Object.js"

export default class GameUI extends Laya.Scene {
    constructor() {
        super();
        //加载场景文件
        this.loadScene("test/TestScene.scene");

        //添加3D场景
        var scene = Laya.stage.addChild(new Laya.Scene3D());

        //添加照相机
        var camera = (scene.addChild(new Laya.Camera(0, 0.1, 200)));
        camera.transform.translate(new Laya.Vector3(0, 5, 10));
        camera.transform.rotate(new Laya.Vector3(-20, 0, 0), true, false);
        camera.clearColor = null;

        // 添加方向光
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
        //灯光开启阴影
        directionLight.shadow = true;
        //可见阴影距离
        directionLight.shadowDistance = 15;
        //生成阴影贴图尺寸
        directionLight.shadowResolution = 1024 * 9;
        //模糊等级,越大越高,更耗性能
        directionLight.shadowPCFType = 3;
        //生成阴影贴图数量
        directionLight.shadowPSSMCount = 1;

    

        // 添加聚光
        var spotLight = scene.addChild(new Laya.SpotLight());
        spotLight.color = new Laya.Vector3(0.2, 0.8, 0.3);
        spotLight.transform.position = new Laya.Vector3(0.0, 1, 0.0);
        spotLight.transform.worldMatrix.setForward(new Laya.Vector3(0.8, -5, -15.0));
        spotLight.range = 60.0;
        spotLight.spotAngle = 90;
        // spotLight.shadow = true;
        // spotLight.shadowDistance = 3;
        // //生成阴影贴图尺寸
        // spotLight.shadowResolution = 2048;
        // //生成阴影贴图数量
        // spotLight.shadowPSSMCount = 1;
        // //模糊等级,越大越高,更耗性能

        // // 添加点光灯
        // var DirectionLight = scene.addChild(new Laya.DirectionLight());
        // //移动灯光位置
        // DirectionLight.transform.translate(new Laya.Vector3(1, 1, 0));
        // // 设置点光照亮范围
        // DirectionLight.range = 5;
        // DirectionLight.shadow = true;
        // DirectionLight.shadowDistance = 15;
        // //生成阴影贴图尺寸
        // DirectionLight.shadowResolution = 1024 * 9;
        // //模糊等级,越大越高,更耗性能
        // DirectionLight.shadowPCFType = 3;
        // //生成阴影贴图数量
        // DirectionLight.shadowPSSMCount = 1;

        // box 一个主角物体
        var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.4, 0.4, 0.4)))
        box.transform.translate(new Laya.Vector3(0, 2, -2));
        box.transform.rotate(new Laya.Vector3(45, 45, 45), false, false);

        // 产生阴影
        box.meshRenderer.castShadow = true;
        box.meshRenderer.material = new Laya.BlinnPhongMaterial(new Laya.Vector4(3, 6, 2, 1));
    
        //添加自定义模型
        // ground地面
        var ground = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(10, 0.01, 10)));
        ground.transform.rotate(new Laya.Vector3(0, 0, 0), false, false);
        var material = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/grass.jpg", Laya.Handler.create(null, function (tex) {
            material.albedoTexture = tex;
        }));
        // 接收投影
        ground.meshRenderer.receiveShadow = true;
        ground.meshRenderer.castShadow = true;
        ground.meshRenderer.material = material;

        // wall 一面墙壁
        var wall = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(10, 5, 0.01)))
        wall.transform.translate(new Laya.Vector3(0, 1, -5));
        // 接收投影
        wall.meshRenderer.receiveShadow = true;
        wall.meshRenderer.castShadow = true;

 

        camera.addComponent(CameraMoveScript);

        var ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
        var point = new Laya.Vector2();
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        
    }

}

