export type EventCallback = (...args: []) => void;

export default class EventBus {
  private listeners: Record<string, EventCallback[]>

  constructor() {
    this.listeners = {}
  }

  public on(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  public off(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      alert(`No event: ${event}`)
      throw new Error(`No event: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    )
  }

  public emit(event: string, ...args: unknown[]): void {
      if (!this.listeners[event]) {
        return
      }

    this.listeners[event].forEach(listener => {
      listener(...(args as []))
    })
  }

  public clear(event: string): void {
    if (this.listeners[event]) {
      delete this.listeners[event]
    }
  }
}
