//language="hbs"
const CustomRoute = `
 <nav>
    <ul class="temp-custom-route">
        {{#each routes}}
            <li id="{{ id }}">{{label}}</li>
        {{/each}}
    </ul>
</nav>
`

const routes = [
    {
        label: 'Логин',
        id: 'go_to_login_page'
    },
    {
        label: 'Регистрация',
        id: 'go_to_registration_page'
    },
    {
        label: 'Чат',
        id: 'go_to_chat_page'
    },
    {
        label: 'Профиль',
        id: 'go_to_profile_page'
    },
    {
        label: '404',
        id: 'go_to_404_page'
    },
    {
        label: '500',
        id: 'go_to_500_page'
    }
]

export {CustomRoute, routes}