let data = {}

data.allFormsPagt = [
    { id: 1, title: 'Saldo Atual', slug: "saldo-atual", desc: 'Saldo atual de sua conta', icon: 'mdi-cash' },
    { id: 2, title: 'Receitas', slug: "receitas", desc: 'Valor total de suas receitas cadastradas', icon: 'mdi-arrow-up', categories:[{id: 1, title: "Salário"}, {id: 2, title: "Investimentos"}, {id: 3, title: "Empréstimos"}, {id: 4, title: "Outros"}], data:[]  },
    { id: 3, title: 'Despesas', slug: "despesas", desc: 'Valor total de suas despesas cadastradas', icon: 'mdi-arrow-down' },
    //{ id: 4, title: 'Cartão de crédito', slug: "cartao-de-credito", desc: 'Valor total de suas contas pagas com cartão de crédito', icon: 'mdi-credit-card' },
]

//data.recCategories = [{id: 1, title: "Salário"}, {id: 2, title: "Investimentos"}, {id: 3, title: "Empréstimos"}, {id: 4, title: "Outros"}]

module.exports = data;