export class DynamicFlatNode {

  constructor(public data: any,
              public name: string,
              public level: number = 1,
              public expandable = false,
              public isLoading = false) {
  }

}
