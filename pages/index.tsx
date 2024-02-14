import React from "react";
import styles from "./index.module.css";

type BookType = {
  date: string,
  item: string,
  amount: number
};

export default function Home() {
  const books: BookType[] = [
    {date: "1/1", item: "お年玉", amount: 10000},
    {date: "1/3", item: "ケーキ", amount: -500},
    {date: "2/1", item: "小遣い", amount: 3000},
    {date: "2/5", item: "マンガ", amount: -600}
  ];

  return (
    <div className={styles.book}>
      <Title>小遣い帳</Title>
      <table>
        <thead>
          <tr><th>日付</th><th>項目</th><th>入金</th><th>出金</th></tr>
        </thead>
        <tbody>
          {books.map((book) =>
            <MoneyBookItem book={book} key={book.date} />
          )}
        </tbody>
      </table>
    </div>
  );
}

type MoneyBookItemProps = {
  book: BookType
}
function MoneyBookItem(props: MoneyBookItemProps) {
  const {date, item, amount} = props.book;

  return (
    <tr>
      <td>{date}</td>
      <td>{item}</td>
      <td>{amount >= 0 ? amount : null}</td>
      <td>{amount < 0 ? -amount : null}</td>
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