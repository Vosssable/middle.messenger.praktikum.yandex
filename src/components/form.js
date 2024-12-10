const Form = `<form class="container__form">
    <div class="title__form">{{ title }}</div>
    {{#each labels }}
        {{#if input}}
            {{> FormInput id=id placeholder=placeholder type=type value=value }}
        {{/if}}
        {{#if upload}}
            <a class="{{class}}" id="{{id}}">{{text}}</a>
            <input type="file" id="upload_button__upload_form" hidden="hidden">
        {{/if}}
        {{#if button}}
            {{> Button id=id class=class text=text }}
        {{/if}}
    {{/each}}
</form>`

export default Form