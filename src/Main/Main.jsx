import React from "react"
import { useForm } from "react-hook-form"
import "./Main.scss"
import {
  AlignmentType,
  Document,
  Footer,
  Header,
  Paragraph,
  SectionType,
  Table,
  TextRun,
  TableRow,
  TableCell,
} from "docx"
import { KSANF, KSANF_DOC, standardPageMargin } from "../Helper/constants"
import {
  hatText,
  TNRText,
  twoItemsWithJustBetween,
} from "../Helper/createDocInstance"

function Main({ finishDocRef }) {
  const { register, handleSubmit } = useForm()

  const onSubmit = state => {
    const hat = {
      properties: {
        type: SectionType.CONTINUOUS,
        page: {
          margin: standardPageMargin,
        },
      },
      children: [
        hatText("Приложение 2 к приказу"),
        hatText("Генерального директора"),
        hatText("ООО «Норникель – ЕРП»,"),
        hatText("управляющей организации АО «ЕРП»"),
        hatText(`от __.____._____ № ${state.docNumber}`),
        new Paragraph({
          indent: { left: "3.5in" },
          children: [
            new TextRun({
              text: "Для АО «ЕРП» на стороне Пароходства",
              size: 24,
              font: "Times New Roman",
              break: 1,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "",
              break: 1,
            }),
          ],
        }),
      ],
    }
    const body = {
      properties: {
        type: SectionType.CONTINUOUS,
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [TNRText("(ТИПОВАЯ ФОРМА)")],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            TNRText(
              `(со ссылкой на Отдельные условия договора на организацию перевозок грузов и Общие условия договоров, заключаемых ПАО «ГМК «Норильский никель» и организациями, входящими в его группу лиц, размещенные в сети Интернет)`,
              { italics: true }
            ),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [TNRText("ДОГОВОР", { bold: true, break: 1 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            TNRText("на организацию перевозок грузов", { bold: true }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            TNRText("№ _______________________________", { bold: true }),
          ],
        }),
        twoItemsWithJustBetween("г. Красноярск", "«___» _________ 20__ г."),
        new Paragraph(""),
        new Paragraph({
          indent: { firstLine: "1in" },
          alignment: AlignmentType.JUSTIFIED,
          children: [
            TNRText(
              "Акционерное общество «Енисейское речное пароходство» (АО «ЕРП»)",
              { bold: true }
            ),
            TNRText(
              `, именуемое в дальнейшем «Пароходство», в лице ${KSANF}, 
              действующего (ей) на основании ${KSANF_DOC}, с одной стороны, и `
            ),
            TNRText(state.clientOrgName, { bold: true }),
            TNRText(", именуемое в дальнейшем «Клиент», в лице "),
            TNRText(state.clientName),
            TNRText(", действующего (ей) на основании "),
            TNRText(state.clientPermission),
            TNRText(
              ", с другой стороны,совместно именуемые «Стороны», заключили настоящий договор о нижеследующем."
            ),
          ],
        }),
      ],
    }
    finishDocRef.current.hat = hat
    finishDocRef.current.body = body
    finishDocRef.current.fileName = state.FileName
    debugger
  }

  return (
    <form className="main" onSubmit={handleSubmit(onSubmit)}>
      <label className="label">
        <span className="label-text">Название документа</span>
        <input {...register("FileName", { required: true })} />
      </label>
      <label className="label">
        <span className="label-text">Фио, должность сотрудника</span>
        <input
          {...register("workerName")}
          defaultValue={"Ксанф"}
          disabled={true}
        />
      </label>
      <label className="label">
        <span className="label-text">Название фирмы контрагента</span>
        <input {...register("clientOrgName", { required: true })} />
      </label>
      <label className="label">
        <span className="label-text">ФИО, должность клиента</span>
        <input {...register("clientName", { required: true })} />
      </label>
      <label className="label">
        <span className="label-text">Доверенность клиента</span>
        <input {...register("clientPermission", { required: true })} />
      </label>

      <input type="submit" />
    </form>
  )
}

export default Main
