import { GameManager } from "./module/GameManager.module";
import { GroundGenerater } from "./scene/ground/GroundGenerator.scene";
import { Player } from "./scene/player/Player.scene";

const gameManager = new GameManager();
gameManager.setInitialObjects([
    GroundGenerater,
]);
gameManager.instantiate(Player);
gameManager.runGame();
