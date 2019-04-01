export class FlatNode {
  constructor(public data: any,
              public level = 0,
              public expandable: boolean = false,
              public isLoading: boolean = false) {
  }
}
