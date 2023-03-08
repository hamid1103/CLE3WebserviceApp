let total = 0
let order = [

]

let items = [
    {name: 'Pannekoek Groot', price: 7},
    {name: 'Pannekoek Klein', price: 7},
    {name: 'Poffertjes', price: 5.75},

    {name: 'Belgische Wafel', price: 4},
    {name: 'Stroopwafel', price: 3},

    {name: 'Vanille Ijs', price: 3.50},
    {name: 'Limburgse Vlaai', price: 4}
]

function addItem(num) {
    console.log(items[num])
    order.push(items[num])

    console.log(order)
    updateList()
}

function updateList() {
    let list = document.getElementById('list')
    list.childNodes.forEach(child => {
        list.removeChild(child)
    })

    for (let i = 0; i < order.length ; i++) {
        item = order[i]
        console.log(item)
        let li = document.createElement('li')
        li.textContent = `${item.name} - €${item.price}`
        list.appendChild(li)
    }
}