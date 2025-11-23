import { GameManager } from "./module/GameManager.module";
import { GameInputController } from "./module/input/GameController.module";
import { GroundGenerater } from "./scene/ground/GroundGenerator.scene";
import { Player } from "./scene/player/Player.scene";
const controller = new GameInputController();
const gameManager = GameManager.getInstance();
gameManager.setInitialObjects([
    GroundGenerater,
]);
gameManager.instantiate(Player);
gameManager.runGame();
