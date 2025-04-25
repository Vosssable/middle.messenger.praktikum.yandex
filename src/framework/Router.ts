import Block from "./Block"
import isEqual from "../utils/mydash/isEqual"
import { checkUserAuth } from "../utils/controllers/auth/doGetUser"
import Store from "./Store/Store"

const store = Store.getInstance()

const render = (query: string, block: Block) => {
  const root = document.querySelector(query)
  if (root) {
    root.replaceWith(block.getContent())
  }
  return root
}

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
      this._block.dispatchComponentWillBeUnMounted()
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname)
  }

  render() {
    if (!this._block)
      this._block = new this._blockClass()

    render(this._props.rootQuery, this._block)
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

    this.checkAuthenticated(window.location.pathname)
  }

  _onRoute(pathname: string) {

    const route = this.getRoute(pathname)

    if (!route) {
      this._onRoute("/nothing")
      return
    }

    // Проверим переход, а то при дебаге что-то нехорошо получилось
    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  go(pathname: string) {
    this.checkAuthenticated(pathname)
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

  checkAuthenticated(pathname: string) {
    checkUserAuth().then(res => {
        if (res) {
          if (typeof res === "string") {
            store.set("user", JSON.parse(res))
          }
          // зачем нам логин или ауф если мы уже вошли
          if (["/", "/sign-up"].includes(pathname)) {
            this.history.pushState({}, "", "/messenger")
            this._onRoute("/messenger")
          } else if (pathname !== "/settings") {
            this.history.pushState({}, "", pathname)
            this._onRoute(pathname)
          } else {
            if (window.location.pathname === "/settings" && pathname === "/settings") {
              this._onRoute(pathname)
            } else {
              this.history.pushState({}, "", pathname)
              this._onRoute(pathname)
            }
          }
        }
      }
    ).catch(() => {
      // если чел не зашел, то вернем его на путь истиный (таков путь)
      if (pathname !== "/sign-up") {
        this.history.pushState({}, "", "/")
        this._onRoute("/")
      } else {
        this.history.pushState({}, "", "/sign-up")
        this._onRoute("/sign-up")
      }
    })
  }
}

export default new Router("#app")