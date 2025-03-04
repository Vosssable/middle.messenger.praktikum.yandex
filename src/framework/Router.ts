import Block from "./Block"
import isEqual from "../utils/mydash/isEqual"
import Store from "./Store/Store"

const render = (query: string, block: Block) => {
  const root = document.querySelector(query)
  if (root) {
    root.replaceWith(block.getContent())
  }
  return root
}, store = new Store()

interface RoutePropsInterface {
  [key: string]: string
}


class Route<BlockClass extends typeof Block> {
  protected _pathname: string
  protected _block: Block | null
  protected _blockClass: BlockClass
  protected _props: RoutePropsInterface

  constructor(
    pathname: string,
    view: BlockClass,
    props: RoutePropsInterface
  ) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.hide()
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname)
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass()
      render(this._props.rootQuery, this._block)
      return
    }

    this._block.show()
  }
}

class Router {
  protected __instance: this | null
  protected _currentRoute: Route<typeof Block> | null
  protected _rootQuery: string | null
  protected routes: Route<typeof Block>[]

  protected readonly history = window.history

  constructor(rootQuery: string) {
    if (this.__instance) {
      return this.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    this.__instance = this
  }

  use(pathname: string, block: typeof Block) {
    if (this._rootQuery) {
      const route = new Route(
        pathname,
        block,
        { rootQuery: this._rootQuery }
      )
      this.routes.push(route)

      return this
    }
  }

  start() {
    window.onpopstate = e => {
      const window = <Window>e.currentTarget
      if (window) {
        this._onRoute(window.location.pathname)
      }
    }

    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (!route) {
      return
    }

    // Проверим редирект, а то при дебаге что-то нехорошо получилось
    if (document.location.pathname !== pathname) {
      document.location.pathname = pathname
    }

    this._currentRoute = route
    route.render()
  }

  go(pathname: string) {
    // проверим то, что чел зашел
    console.log(store.getState())
    console.log(store.isEmpty())
    // если чел не зашел (сторэдж пустой), то вернем его на путь истиный
    if ((pathname !== "/" && pathname !== "/auth") && store.isEmpty()) {
      this.history.pushState({}, "", pathname)
      this._onRoute("/")
      return
    }

    // на нет и суда нет
    if (!this.getRoute(pathname)) {
      this._onRoute("/nothing")
      return
    }

    this.history.pushState({}, "", pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.go(1)
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname))
  }
}

export default new Router("#app")