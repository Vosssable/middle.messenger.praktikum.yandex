//language="hbs"
const Dropdown = `
<div class="{{ class }}">
    {{#each buttons}}
        {{>PropertyButton src=src text=text id=id}}
    {{/each}}
</div>
`

export default Dropdown