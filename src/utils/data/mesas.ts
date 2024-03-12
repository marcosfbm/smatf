const MESA = [
  {
    id: -1,
    title: "LIVRE",
    total: 0.0
  },
  {
    id: 1,
    title: "MESA 001",
    total: 100.0
  },
  {
    id: 2,
    title: "MESA 002",
    total: 80.0
  },
  {
    id: 3,
    title: "MESA 003",
    total: 0.0
  },
  {
    id: 4,
    title: "MESA 004",
    total: 0.0
  },
  {
    id: 5,
    title: "MESA 005",
    total: 0.0
  },
  {
    id: 6,
    title: "MESA 006",
    total: 0.0
  },
]


const MESAS = MESA.map((item) => item.title)

type TableProps = (typeof MESAS)[0]

export { MESA, MESAS, TableProps }
