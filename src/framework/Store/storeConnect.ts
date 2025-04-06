import Block from "../Block"
import { Indexed } from "../../utils/interfaces/frameworkInterfaces"
import Store, { StoreEvents } from "./Store"
import isEqual from "../../utils/mydash/isEqual"

export default function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
  return class extends Component {
    constructor(props = {}) {
      const store = Store.getInstance()
      let state = mapStateToProps(store.getState())

      super({ ...props, ...mapStateToProps(store.getState()) })

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState())
        console.log('connect', newState)
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState })
        }

        state = newState
      })
    }
  }
}