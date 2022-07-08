import "./App.scss"
import React from "react"
import { Document, Footer, Header, Packer, Paragraph } from "docx"
import { saveAs } from "file-saver"
import Main from "./Main/Main"
import Part1 from "./Part1/Part1"

function App() {
  const finishDocRef = React.useRef({})

  const generate = () => {
    const { fileName, ...sections } = finishDocRef.current
    const doc = new Document({
      sections: [...Object.values(sections)],
    })

    Packer.toBlob(doc).then(blob => {
      console.log(blob)
      saveAs(blob, `${fileName}.pdf`)
      console.log("Document created successfully")
    })
  }
  const generate1 = () => {
    const doc = new Document({
      sections: [
        {
          headers: {
            default: new Header({
              children: [new Paragraph("Header text")],
            }),
          },
          footers: {
            default: new Footer({
              children: [new Paragraph("Footer text")],
            }),
          },
          children: [new Paragraph("Hello World")],
        },
      ],
    })
  }

  // const generate1 = () => {
  //   const doc = new Document({
  //     sections: [
  //       {
  //         properties: {},
  //         children: [
  //           new Paragraph({
  //             children: [new TextRun("Hello World")],
  //           }),
  //           new Paragraph({
  //             children: [
  //               new TextRun("Введенный текст: "),
  //               new TextRun({
  //                 text: temp,
  //                 bold: true,
  //               }),
  //             ],
  //           }),
  //         ],
  //       },
  //     ],
  //   })
  // }
  return (
    <div className="app">
      <Main finishDocRef={finishDocRef} />
      <Part1 finishDocRef={finishDocRef} />
      <button onClick={generate}>Download</button>
    </div>
  )
}

export default App
