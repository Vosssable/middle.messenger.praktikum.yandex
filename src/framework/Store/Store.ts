import EventBus from "../EventBus"
import set from "../../utils/mydash/set"
import { Indexed } from "../../utils/interfaces/frameworkInterfaces"

export enum StoreEvents {
  Updated = "updated"
}

export default class Store extends EventBus {
  private state: Indexed = {}
  private static instance: Store

  private constructor() {
    super()
  }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store()
    }

    return Store.instance
  }

  public getState(): Indexed {
    return this.state
  }

  public isEmpty(): boolean {
    return Object.keys(this.state).length === 0
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value)
    this.emit(StoreEvents.Updated)
  }


}

