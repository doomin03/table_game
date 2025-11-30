import { GameManager } from "./../engine/GameManager.module";
import { GameInputController } from "./../engine/input/GameController.module";
import { TextureManager } from "./../engine/TextureManager.module";
import { groundGenerater } from "./scene/ground/GroundGenerator.scene";


const controller = new GameInputController();

const textureManager = TextureManager.instance;
const gameManager = GameManager.getInstance();
gameManager.setInitialObjects([
    groundGenerater,
]);
gameManager.runGame();
