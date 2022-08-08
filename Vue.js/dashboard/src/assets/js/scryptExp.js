let data = {}

data.allFormsPagt = [
    { id: 1, title: 'Saldo Atual', slug: "saldo-atual", desc: 'Saldo atual de sua conta', icon: 'mdi-cash' },
    { id: 2, title: 'Receitas', slug: "receitas", desc: 'Valor total de suas receitas cadastradas', icon: 'mdi-arrow-up', categories:[{id: 1, title: "Salário"}, 
    {id: 2, title: "Investimentos"}, {id: 3, title: "Empréstimos"}, {id: 4, title: "Outros"}], data:[]  },
    { id: 3, title: 'Despesas', slug: "despesas", desc: 'Valor total de suas despesas cadastradas', icon: 'mdi-arrow-down',
        categories:[{id: 1, title: "Casa"}, {id: 2, title: "Educação"}, {id: 3, title: "Eletrônicos"}, {id: 4, title: "Lazer"}, {id: 5, title: "Outros"}, 
        {id: 6, title: "Restaurante"}, {id: 7, title: "Saúde"}, {id: 8, title: "Serviços"}, {id: 9, title: "Supermercado"} 
    ], data:[]   },
]

module.exports = data;