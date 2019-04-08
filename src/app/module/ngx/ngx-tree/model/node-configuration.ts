export class NodeConfiguration<T> {
  constructor(public name: string,
              public when?: (index: number, nodeData: T) => boolean) {
  }
}
