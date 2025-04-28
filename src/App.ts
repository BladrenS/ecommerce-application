export class App {
  public root: HTMLElement;

  constructor(rootId: string) {
    const rootElement = document.getElementById(rootId);

    if (!rootElement) {
      throw new Error(`Root element with id '${rootId}' not found`);
    }
    this.root = rootElement;
  }

  public init(): void {
   
  }
}
