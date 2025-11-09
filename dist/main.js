import { GameManager } from "./module/GameManager.module";
import { GroundGenerater } from "./scene/ground/GroundGenerator.scene";
const gameManager = new GameManager();
gameManager.setInitialObjects([
    GroundGenerater,
]);
gameManager.runGame();
