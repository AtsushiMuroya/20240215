import React, { useEffect, useState } from "react";
import styles from './index.module.css';

type BookType = {
  date: string,
  item: string,
  amount: number
};

export default function Home() {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    setBooks([
      {date: "1/1", item: "お年玉", amount: 10000},
      {date: "1/3", item: "ケーキ", amount: -500},
      {date: "2/1", item: "小遣い", amount: 3000},
      {date: "2/5", item: "マンガ", amount: -600}
    ]);
  }, []);

  const addBook = (book: BookType) => {
    setBooks(books.concat(book));
  }

  return (
    <div className={styles.book}>
      <Title>小遣い帳</Title>
      <MoneyBookList books={books} />
      <MoneyEntry add={addBook} />
    </div>
  );
}

type MoneyBookListProps = {
  books: BookType[]
}
function MoneyBookList(props: MoneyBookListProps) {
  let sum = 0;
  const totals = props.books.map(book => sum += book.amount);

  return (
    <table>
      <thead>
        <tr><th>日付</th><th>項目</th><th>入金</th><th>出金</th><th>残高</th></tr>
      </thead>
      <tbody>
        {props.books.map((book, ix) =>
          <MoneyBookItem book={book} total={totals[ix]} key={book.date} />
        )}
      </tbody>
    </table>
  );
}

type MoneyBookItemProps = {
  book: BookType,
  total: number
}
function MoneyBookItem(props: MoneyBookItemProps) {
  const {date, item, amount} = props.book;

  return (
    <tr>
      <td>{date}</td>
      <td>{item}</td>
      <td>{amount >= 0 ? amount : null}</td>
      <td>{amount < 0 ? -amount : null}</td>
      <td>{props.total}</td>
     </tr>
  );
}

type TitleProps = {
  children: React.ReactNode;
}
function Title(props: TitleProps) {
  return (
    <h1>{props.children}</h1>
  );
}

type MoneyEntryProps = {
  add: (book: BookType) => void
}
function MoneyEntry(props: MoneyEntryProps) {
  const [payingIn, setPayingIn] = useState(true);
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");

  const clearEntry = () => {
    setPayingIn(true); setDate(""); setItem(""); setAmount("");
  }

  const onClickSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amountInOut = Number(amount) * (payingIn ? 1 : -1);
    const book = {date: date, item: item, amount: amountInOut};

    props.add(book);
    clearEntry();
  }

  return (
    <form onSubmit={onClickSubmit}>
      <h3>記帳</h3>
      <div>
        <label>
          <input type="radio" checked={payingIn} onChange={() => setPayingIn(true)} />
          入金
        </label>
        <label>
          <input type="radio" checked={!payingIn} onChange={() => setPayingIn(false)} />
          出金
        </label>
      </div>
      <div>
        <label>日付：
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="3/15" />
        </label>
      </div>
      <div>
        <label>項目：
          <input type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder="おこづかい" />
        </label>
      </div>
      <div>
        <label>金額：
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="500" />
        </label>
      </div>
      <div>
        <input type="submit" value="追加" />
      </div>
    </form>
  );
}