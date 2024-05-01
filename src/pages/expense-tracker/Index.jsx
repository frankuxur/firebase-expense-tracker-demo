import { useState } from "react"
import { useAddTransaction } from "../../hooks/useAddTransaction"
import { useGetTransactions } from "../../hooks/useGetTransactions"
import { useGetUserInfo } from "../../hooks/useGetUserInfo"
import { signOut } from "firebase/auth"
import { auth } from "../../config/firebase-config"
import { Navigate, useNavigate } from "react-router-dom"

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction()
    const { transactions } = useGetTransactions()
    const { name, profilePhoto, isAuth } = useGetUserInfo()
    const navigate = useNavigate()

    const [description, setDescription] = useState('')
    const [transactionAmount, setTransactionAmount] = useState(0)
    const [transactionType, setTransactionType] = useState('expense')

    const onSubmit = async (e) => {
        e.preventDefault()
        addTransaction({
            description,
            transactionAmount,
            transactionType,
        })
    }
    // console.log(new Date().toISOString().slice(0, 10))

    const signUserOut = async () => {
        try {
            await signOut(auth)
            localStorage.removeItem('auth')
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    if (!isAuth) {
        return <Navigate to='/' />
    }

    return (
        <>
            <div className="expense-tracker">
                <div className="container">
                    <h1>{name}'s Expense Tracker</h1>
                    <div className="balance">
                        <h2>Your Balance</h2>
                        <h3> $0.00</h3>
                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4> Income</h4>
                            <p>$0.00</p>
                        </div>
                        <div className="expenses">
                            <h4> Income</h4>
                            <p>$0.00</p>
                        </div>
                    </div>

                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input type="text" placeholder="Description" required onChange={e => setDescription(e.target.value)} />
                        <input type="number" placeholder="Amount" required onChange={e => setTransactionAmount(e.target.value)} />
                        <input 
                            type="radio" 
                            placeholder="Expense" 
                            id="expense" 
                            value='expense'
                            onChange={e => setTransactionType(e.target.value)} 
                            checked={transactionType === 'expense'}
                        />
                        <label htmlFor="expense"> Expense</label>
                        <input 
                            type="radio" 
                            placeholder="Income" 
                            id="income"
                            value='income' 
                            onChange={e => setTransactionType(e.target.value)} 
                            checked={transactionType === 'income'}
                        />
                        <label htmlFor="income"> Income</label>

                        <button type="submit"> Add Transation</button>
                    </form>
                </div>
            </div>

            {profilePhoto && (
                <div className="profile">
                    <img src={profilePhoto} alt="profile photo" width={120} height={120} style={{borderRadius: '50%'}} />
                    <button className="sign-out-btn" onClick={signUserOut}>Sign Out</button>
                </div>
            )}

            <div className="transactions" style={{textAlign: 'center'}}>
                <h3> Transactions</h3>

                <ul>
                    {transactions.map(transaction => {
                        const { description, transactionType, transactionAmount, id } = transaction

                        return (
                            <li key={id}>
                                <h4>{description}</h4>

                                <p>{transactionAmount} ● {transactionType} </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}