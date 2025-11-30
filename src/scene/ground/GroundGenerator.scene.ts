import { GameObject } from "@engine/object/GameObject.module";
import { GroundGenerater } from "./script/GroundGenerator.script";


const groundGenerater = new GameObject();
groundGenerater.setComponent(GroundGenerater);

export { groundGenerater };