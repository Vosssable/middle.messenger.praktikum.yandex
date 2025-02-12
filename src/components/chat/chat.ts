import Block from '../../framework/Block'
import {ChatPageAttrsInterface} from "../../utils/interfaces/attrsInterfaces";

export class Chat extends Block {
    constructor(props: ChatPageAttrsInterface) {
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
            }
        })
    }

    override render() {
        return `
            <div class="{{ attrs.chatClass }} {{ class }}">
                <div class="{{ attrs.chatAvatarClass }}">{{ avatar }}</div>
                <div class="{{ attrs.chatInfoClass }}">
                    <div class="{{ attrs.chatNameClass }}">{{ chatName }}</div>
                    <div class="{{ attrs.chatLastMessageClass }}">{{ lastMessage }}</div>
                </div>
                <div class="{{ attrs.chatSpecialInfoClass }}">
                    <div class="{{ attrs.chatSpecialInfoDatetimeClass }}">{{ lastMessageDatetime }}</div>
                    ${this.props['newMessageCount'] ? `<div class="{{ attrs.chatSpecialInfoNewMessagesClass }}">{{ newMessageCount }}</div>` : ``}
                </div>
            </div>
        `
    }
}
