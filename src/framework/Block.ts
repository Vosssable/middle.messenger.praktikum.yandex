import Handlebars from "handlebars"
import EventBus, { EventCallback } from "./EventBus"
import { BlockListInterface, BlockProps } from "../utils/interfaces/frameworkInterfaces"
import Router from "./Router"

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CWB_UM: "flow:component-will-be-unmounted",
    FLOW_RENDER: "flow:render"
  }

  public Router = Router

  protected _element: HTMLElement | null = null

  protected _id: number = Math.floor(100000 + Math.random() * 900000)

  protected props: BlockProps

  protected children: Record<string, Block>

  protected lists: BlockListInterface

  protected eventBus: () => EventBus

  constructor(propsWithChildren: BlockProps = {}) {
    const eventBus = new EventBus()
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren)
    this.props = this._makePropsProxy({ ...props })
    this.children = children
    this.lists = <BlockListInterface>this._makePropsProxy({ ...lists })
    this.eventBus = () => eventBus
    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
    this.dispatchComponentDidMount()
  }

  protected addEvents(): void {
    const { events = {} } = this.props
    Object.keys(events).forEach(eventName => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName])
      }
    })
  }

  protected removeEvents(): void {
    const { events = {} } = this.props
    Object.keys(events).forEach(eventName => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName])
      }
    })
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback)
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback)
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback)
    eventBus.on(Block.EVENTS.FLOW_CWB_UM, this._componentWillBeUnMounted.bind(this) as EventCallback)
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback)
  }

  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  private _componentDidMount(): void {
    this.componentDidMount()
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount()
    })
  }

  private _componentWillBeUnMounted(): void {
    this.componentWillBeUnMounted()
    Object.values(this.children).forEach(child => {
      child.componentWillBeUnMounted()
    })
  }

  protected componentWillBeUnMounted(): void {
  }

  protected componentDidMount(): void {
  }

  public dispatchComponentWillBeUnMounted(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CWB_UM)
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    console.debug(oldProps, newProps)
    return true
  }

  private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
    children: Record<string, Block>,
    props: BlockProps,
    lists: BlockListInterface
  } {
    const children: Record<string, Block> = {}
    const props: BlockProps = {}
    const lists: BlockListInterface = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else if (Array.isArray(value)) {
        lists[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props, lists }
  }

  protected addAttributes(): void {
    const { attr = {} } = <Record<string, string>>this.props

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element && value) {
        this._element.setAttribute(key, value as string)
      }
    })
  }

  protected setAttributes(attr: BlockProps): void {
    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string)
      }
    })
  }

  public setProps = (nextProps: BlockProps): void => {
    if (!nextProps) {
      return
    }
    this.lists = {}
    this.children = {}


    const { props, children, lists } = this._getChildrenPropsAndProps(nextProps)
    Object.assign(this.props, props)
    Object.assign(this.children, children)
    Object.assign(this.lists, lists)
    this._render()
  }

  public setLists = (nextList: BlockListInterface): void => {
    if (!nextList) {
      return
    }

    Object.assign(this.lists, nextList)
  }

  get element(): HTMLElement | null {
    return this._element
  }

  private _render(): void {
    const propsAndStubs = { ...this.props }
    const tmpId = Math.floor(100000 + Math.random() * 900000)
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`
    })

    const fragment = this._createDocumentElement("template")
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs)
    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      if (stub) {
        stub.replaceWith(child.getContent())
      }
    })

    Object.entries(this.lists).forEach(([, child]) => {
      const listCont = this._createDocumentElement("template")
      child.forEach(item => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent())
        } else {
          listCont.content.append(`${item}`)
        }
      })
      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`)
      if (stub) {
        stub.replaceWith(listCont.content)
      }
    })
    this.removeEvents()
    const newElement = fragment.content.firstElementChild as HTMLElement
    if (this._element && newElement) {
      this._element.replaceWith(newElement)
    }
    this._element = newElement
    this.addEvents()
    this.addAttributes()
  }

  protected render(): string {
    return ""
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error("Element is not created")
    }
    return this._element
  }

  private _makePropsProxy(props: BlockProps): BlockProps {
    const eventBus = () => this.eventBus()

    return new Proxy(props, {
      get(target: BlockProps, prop: string) {
        const value = target[prop]
        return typeof value === "function" ? value.bind(target) : value
      },
      set(target: BlockProps, prop: string, value: BlockProps) {
        const oldTarget = { ...target }
        target[prop] = value
        eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error("No access")
      }
    })
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement
  }

  public show(): void {
    const content = this.getContent()
    if (content) {
      content.classList.add("display-block")
    }
  }

  public hide(): void {
    const content = this.getContent()
    if (content) {
      content.classList.remove("display-block")
    }
  }
}
