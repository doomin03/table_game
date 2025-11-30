import { GameMesh } from "@engine/object/GameObject.module";
import { Player } from "./script/Player.script";
import { BoxGeometry, MeshStandardMaterial, Vector3 } from "three";
import { BoxShape } from "@engine/component/gravity/Gravity.component";
import { MoventComponent } from "@engine/component/movement/MoventComponent";

const playerGeometry = new BoxGeometry(0.5, 1, 0.5);
const platerMatrial = new MeshStandardMaterial();
const player = new GameMesh(playerGeometry, platerMatrial);
player.setComponent(BoxShape, {
    mass: 1,
    scale: new Vector3(0.5, 1, 0.5),
});
player.setComponent(MoventComponent)
player.setComponent(Player)


export { player } 