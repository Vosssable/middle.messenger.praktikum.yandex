const Form = `<form class="container__form {{ class }}">
    <h1 class="title__form">{{ title }}</h1>
    {{#each labels }}
        {{#if input}}
            {{> FormInput id=id placeholder=placeholder type=type value=value }}
        {{/if}}
        {{#if upload}}
            <label class="{{class}}" id="{{id}}">{{text}}
                <input type="file" id="upload_button__upload_form" hidden="hidden" name={{value}}>
            </label>
        {{/if}}
        {{#if button}}
            {{> Button id=id class=class text=text }}
        {{/if}}
    {{/each}}
</form>`

export default Form