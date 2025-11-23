


export class GameInputController {
    constructor(){
        this.add()
    }

    add(){
        window.addEventListener('keydown',(e:Event)=>{
            console.log(e)
        });
    }
}