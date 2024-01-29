import { v4 as uuid } from "uuid"
export const cardsData = [
  {
    id: uuid(),
    title: "S",
		bg: "#FF7374", 
    items: [
      {
        id: uuid(),
        name: "material ui"
      },
      {
        id: uuid(),
        name: "bootstrap"
      },
    ]
  },
  {
    id: uuid(),
    title: "A",
		bg: "#FFB774",
    items: [
      {
        id: uuid(),
        name: "react"
      },
      {
        id: uuid(),
        name: "node"
      },
    ]
  },
  {
    id: uuid(),
    title: "B",
		bg: "#FFDA74",
    items: [
      {
        id: uuid(),
        name: "redux"
      },
      {
        id: uuid(),
        name: "recoil"
      },
    ]
  }


]