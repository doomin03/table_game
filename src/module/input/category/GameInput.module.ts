


export class KeyAction {

}

export class GameInput {
    key: string = "";
    constructor(key:string){
        this.key = key
    }

    setAction(keyActions: KeyAction[]){

    }
}

/**
 * 
 * GameInput 키이벤트를 등록하는 객체 
 * 등록할 키 입력, 키 누렀을때 동장하는 기능등
 
 * 
 * if문 말고 enum 으로 구현해벌것
 */