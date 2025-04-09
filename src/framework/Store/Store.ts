import EventBus from "../EventBus"
import set from "../../utils/mydash/set"
import { Indexed } from "../../utils/interfaces/frameworkInterfaces"

export enum StoreEvents {
  Updated = "updated",
  ChatListUpdated = "chatListUpdated",
  CurrentChat = "currentChat"
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

  public reset(path: string) {
    this.state[path] = null
  }

  public set(path: string, value: unknown) {
    if (path === 'chats') {
      set(this.state, path, value)
      this.emit(StoreEvents.ChatListUpdated)
    } else {
      set(this.state, path, value)
      this.emit(StoreEvents.Updated)
    }
  }
}

