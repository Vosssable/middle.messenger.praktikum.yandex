//language="hbs"
const ProfileInput = `
        <div class="profile-input {{ inputClass }}">
            <div class="profile-input__label {{ labelClass }}" id="{{ idButton }}">{{ label }}</div>
            {{#if value}}
            <input class="profile-input__value" disabled="{{ disabled }}" value="{{ value }}" id="{{ id }}">
            {{/if}}
        </div>
`

export default ProfileInput;