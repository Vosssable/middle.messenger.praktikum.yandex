export const PropertyButton = `
    <div class="dropdown__properties-element" id="{{ id }}">
        {{#if src}}
            <span>
                <img src="{{ src }}" alt="{{ text }}"/>
            </span>
        {{/if}}
        {{ text }}
    </div>
`

export default PropertyButton