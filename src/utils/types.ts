export type BookType = {
  id: number;
  isbn: string;
  title?: string;
  cover: string;
  author: string;
  published: number;
  pages?: number;
};
export interface IBook {
  book: BookType;
  status?: number;
}

// const data = {
//   data: {
//     book: {
//       id: 21,
//       isbn: "9781118464465",
//       title: "Raspberry Pi User Guide",
//       cover: "http://url.to.book.cover",
//       author: "Eben Upton",
//       published: 2012,
//       pages: 221,
//     },
//     status: 2,
//   },
//   isOk: true,
//   message: "ok",
// };
