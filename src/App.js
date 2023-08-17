import { React, Component } from 'react'
import Modals from './components/Modals'
import { rupiah } from './utils/utils'
import dateFormat from 'dateformat'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      moneyRemaining: 0,
      moneyPercentage: 0,
      moneyIncome: 0,
      moneyExpense: 0,
      transactionIncome: 0,
      transactionExpense: 0,
      transactions: [
        {
          description: 'Income Salary',
          date: '18 August 2023',
          nominal: 1000000,
          category: 'income'
        },
        {
          description: 'Top Up E-Money',
          date: '19 August 2023',
          nominal: 250000,
          category: 'expense'
        }
      ]
    }
    this.addData = this.addData.bind(this)
    this.handleCalc = this.handleCalc.bind(this)
  }

  addData(object) {
    const newData = [...this.state.transactions, object]
    const listMoneyIncome = newData.filter((item) => item.category === 'income')
    const nominalMoneyIncome = listMoneyIncome.map((item) => item.nominal)
    const totalMoneyIncome = nominalMoneyIncome.reduce((total, num) => total + num, 0)

    const listMoneyExpense = newData.filter((item) => item.category === 'expense')
    const nominalMoneyExpense = listMoneyExpense.map((item) => item.nominal)
    const totalMoneyExpense = nominalMoneyExpense.reduce((total, num) => total + num, 0)

    this.setState({
      moneyIncome: totalMoneyIncome,
      transactionIncome: nominalMoneyIncome.length,
      moneyExpense: totalMoneyExpense,
      transactionExpense: nominalMoneyExpense.length,
      moneyRemaining: totalMoneyIncome - totalMoneyExpense,
      moneyPercentage: (totalMoneyIncome - totalMoneyExpense) / totalMoneyIncome * 100,
      transactions: newData
    })
  }

  handleCalc() {
    const listMoneyIncome = this.state.transactions.filter((item) => item.category === 'income')
    const nominalMoneyIncome = listMoneyIncome.map((item) => item.nominal)
    const totalMoneyIncome = nominalMoneyIncome.reduce((total, num) => total + num)

    const listMoneyExpense = this.state.transactions.filter((item) => item.category === 'expense')
    const nominalMoneyExpense = listMoneyExpense.map((item) => item.nominal)
    const totalMoneyExpense = nominalMoneyExpense.reduce((total, num) => total + num)

    this.setState({
      moneyIncome: totalMoneyIncome,
      transactionIncome: nominalMoneyIncome.length,
      moneyExpense: totalMoneyExpense,
      transactionExpense: nominalMoneyExpense.length,
      moneyRemaining: totalMoneyIncome - totalMoneyExpense,
      moneyPercentage: (totalMoneyIncome - totalMoneyExpense) / totalMoneyIncome * 100
    })
  }

  componentDidMount() {
    if (this.state.transactions.length < 1) {
      console.log('Empty Data');
    } else {
      this.handleCalc()
    }
  }

  render() {
    return (
      <div className='container py-5'>
        <div className='row'>
          <div className='col-12 text-center'>
            <h1>FEEDUITEN APPS</h1>
            <hr className='w-75 mx-auto' />
            <h2>{rupiah(this.state.moneyRemaining)}</h2>
            <span className='subtitle'>Sisa uang kamu tersisa {this.state.moneyPercentage + '%'} lagi</span>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-6'>
            <div className='card-wrapper'>
              <div className='icon-wrapper-income mb-3'>
                <i className='bi bi-wallet2'></i>
              </div>
              <span className='title'>Income</span>
              <h3>{rupiah(this.state.moneyIncome)}</h3>
              <div>
                <span className='subtitle text-purple'>{this.state.transactionIncome} <span className='subtitle'> Transaction</span></span>
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='card-wrapper'>
              <div className='icon-wrapper-expense mb-3'>
                <i className='bi bi-cash-stack'></i>
              </div>
              <span className='title'>Expense</span>
              <h3>{rupiah(this.state.moneyExpense)}</h3>
              <div>
                <span className='subtitle text-purple'>{this.state.transactionExpense} <span className='subtitle'> Transaction</span></span>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-12 d-flex justify-content-between align-items-center'>
            <h4>Ringkasan Transaksi</h4>
            <div className='button-wrapper d-flex'>
              <Modals action={this.addData} variant='btn btn-purple me-2' icon='bi bi-plus-circle-fill ps-2' text='Income' modalHeading='Add Income' category='income'></Modals>
              <Modals action={this.addData} variant='btn btn-pink' icon='bi bi-dash-circle-fill ps-2' text='Expense' modalHeading='Add Expense' category='expense'></Modals>
            </div>
          </div>
        </div>
        <div className='row row-gap-3 mt-4'>
          {this.state.transactions.length < 1 && "Empty Data"}
          {this.state.transactions.map((transaction, index) => {
            return (
              <div key={index} className='col-12 d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                  <div className={transaction.category === 'income' ? 'icon-wrapper-income me-3' : 'icon-wrapper-expense me-3'}>
                    <i className={transaction.category === 'income' ? 'bi bi-wallet2' : 'bi bi-cash-stack'}></i>
                  </div>
                  <div className='transaction'>
                    <h6>{transaction.description}</h6>
                    <span className='subtitle'>{dateFormat(transaction.date,'dd mmmm yyyy')}</span>
                  </div>
                </div>
                <h5 className={transaction.category === 'income' ? 'text-purple' : 'text-pink'}>{rupiah(transaction.nominal)}</h5>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
