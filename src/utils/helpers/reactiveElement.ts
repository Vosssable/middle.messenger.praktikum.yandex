interface Elements<T> {
    (value: T): void
}

export default class ReactiveElement<T> {
    private value: T
    private elements: Elements<T>[] = []

    constructor (value: T) {
        this.value = value
        this.elements = []
    }

    subscribe (element: Elements<T>): void {
        this.elements.push(element)
    }

    notify (): void {
        this.elements.forEach(element => element(this.value))
    }

    set (value: T) {
        this.value = value
        this.notify()
    }

    get (): T {
        return this.value
    }
}