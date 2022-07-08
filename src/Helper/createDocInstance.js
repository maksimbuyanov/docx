import {
  AlignmentType,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx"
import { noBorder } from "./constants"

export const twoItemsWithJustBetween = (first, second) =>
  new Table({
    width: { size: "100%" },
    columnWidths: [1, 1],
    borders: noBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.START,
                children: [TNRText(first)],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.END,
                children: [TNRText(second)],
              }),
            ],
          }),
        ],
      }),
    ],
  })

export const TahomaText = text =>
  new TextRun({
    text,
    font: "Tahoma",
    size: 24,
  })
export const TNRText = (text, options) =>
  new TextRun({
    text,
    font: "Times New Roman",
    size: 24,
    ...options,
  })

export const hatText = text =>
  new Paragraph({
    indent: { left: "3.5in" },
    children: [TahomaText(text)],
  })

export const numberGeneration = sectionNumber => {
  let number = 0
  return () => {
    if (!number) {
      number++
      return `${sectionNumber}.`
    }
    return `${sectionNumber}.${number++}.`
  }
}
