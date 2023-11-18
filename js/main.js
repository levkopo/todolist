import {StorageState, toggle} from "./fweb";

/**
 * States
 */
const [toggleTheme, onThemeToggled] = toggle(StorageState('theme', false))
const [setList, onListUpdated] = StorageState('list', [])

/**
 * Elements getter
 */
const action = document.getElementsByClassName('actions')[0]
const createItemBtn = document.getElementById('create-item')
const list = document.getElementById('list')

/**
 * Theme core
 */
const themeSwitcher = document.createElement('div')
themeSwitcher.classList.add('icon-button', 'material-symbols-outlined')
action.appendChild(themeSwitcher)


onThemeToggled(theme => {
    themeSwitcher.innerText = theme ? 'light_mode': 'dark_mode'
    document.documentElement.setAttribute('theme', theme ? 'dark': 'light')
})

themeSwitcher.addEventListener('click', toggleTheme)

/**
 * List core
 */
onListUpdated((lst) => {
    list.innerText = ''

    for (const lstElement of lst.reverse()) {
        const item = document.createElement('div')
        item.classList.add('card', 'todo-item')

        const itemText = document.createElement('h5')
        itemText.innerText = lstElement.text
        item.appendChild(itemText)

        const removeBtn = document.createElement('button')
        removeBtn.classList.add('button', 'negative')
        removeBtn.innerText = 'Удалить'
        removeBtn.addEventListener('click', () => {
            setList((lst) => {
                delete lst[lst.indexOf(lstElement)]
                return lst.filter(it => !!it)
            })
        })

        item.appendChild(removeBtn)
        list.appendChild(item)
    }
})

createItemBtn.addEventListener('submit', (e) => {
    e.preventDefault()
    window['new-todo'].close()

    setList((lst) => {
        lst.push({
            text: e.currentTarget.elements.text.value
        })

        return lst
    })
})