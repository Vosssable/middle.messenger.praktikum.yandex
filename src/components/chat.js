const Chat = `
<div class="chat {{ class }}">
    <div class="chat__avatar">{{ avatar }}</div>
    <div class="chat__info">
        <div class="chat__name">{{ chatName }}</div>
        <div class="chat__last-message">{{ lastMessage }}</div>
    </div>
    <div class="chat-special-info">
        <div class="chat-special-info__datetime">{{ lastMessageDatetime }}</div>
        {{#if newMessageCount}}
        <div class="chat-special-info__new-messages">{{ newMessageCount }}</div>
        {{/if}}
    </div>
</div>
`

export default Chat