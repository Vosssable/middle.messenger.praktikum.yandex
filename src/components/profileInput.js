//language="hbs"
const ProfileInput = `
        <div class="profile-input {{ inputClass }}">
            <div class="profile-input__label {{ labelClass }}" id="{{ idButton }}">{{ label }}</div>
            {{#if value}}
                {{#if disabled}}
                    <input class="profile-input__value" value="{{ value }}" disabled id="{{ id }}" name="{{ id }}">
                {{ else }}
                    <input class="profile-input__value" value="{{ value }}" id="{{ id }}" name="{{ id }}">
                {{/if}}
            {{ else if placeholder }}
                <input class="profile-input__value width-250" id="{{ id }}" name="{{ id }}" type="{{ type }}" placeholder="{{ placeholder }}">
            {{/if}}
        </div>
`

export default ProfileInput;