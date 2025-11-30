
export class GameInputController {
  private keys = new Set<string>();

  constructor() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      this.keys.add(e.code);
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
      this.keys.delete(e.code);
    });

    window.addEventListener("blur", () => this.keys.clear());
  }

  isDown(code: string) {
    return this.keys.has(code);
  }
}

export const Input = new GameInputController();
