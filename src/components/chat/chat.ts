import Block from '../../framework/Block'
import {ChatsInterface} from "../../utils/interfaces/attrsInterfaces";
import changeClassList from "../../utils/helpers/changeClassList"
import Store from "../../framework/Store/Store"

export class Chat extends Block {
    constructor(props: ChatsInterface) {
        const store = Store.getInstance()
        super({
            ...props,
            attrs: {
                chatClass: 'chat',
                chatAvatarClass: 'chat__avatar',
                chatInfoClass: 'chat__info',
                chatNameClass: 'chat__name',
                chatLastMessageClass: 'chat__last-message',
                chatSpecialInfoClass: 'chat-special-info',
                chatSpecialInfoDatetimeClass: 'chat-special-info__datetime',
                chatSpecialInfoNewMessagesClass: 'chat-special-info__new-messages'
            },
            events: {
                click: (event: MouseEvent) => {
                    const currentChat = store.getState().currentChat
                    if (currentChat) {
                        if (props.chatId === currentChat) return
                    }
                    const target = event.target as HTMLElement
                    changeClassList('current-select', target)
                    store.set('currentChat', props.chatId)
                }
            }
        })
    }

    override render() {
        return `
            <div class="chat-list__item" id="chat_item_{{ chatId }}">
              <div class="{{ attrs.chatClass }} no-cursor">
                <div class="{{ attrs.chatAvatarClass }}"><img class="{{attrs.chatAvatarClass}}" src="{{ avatar }}" alt="Photo"></div>
                <div class="{{ attrs.chatInfoClass }}">
                    <div class="{{ attrs.chatNameClass }}">{{ chatName }}</div>
                    <div class="{{ attrs.chatLastMessageClass }}">{{ lastMessage }}</div>
                </div>
                <div class="{{ attrs.chatSpecialInfoClass }}">
                    <div class="{{ attrs.chatSpecialInfoDatetimeClass }}">{{ lastMessageDatetime }}</div>
                    ${this.props['newMessageCount'] ? `<div class="{{ attrs.chatSpecialInfoNewMessagesClass }}">{{ newMessageCount }}</div>` : ``}
                </div>
              </div>
            </div>
        `
    }
}
