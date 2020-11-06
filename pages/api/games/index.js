import nc from 'next-connect'
import Cors from 'cors'

const { RAWG_SECRET } = process.env
const PAGE_SIZE = 10

const handler = nc()
const cors = Cors({
  methods: ['GET']
})

handler.use(cors)

handler.get(async (req, res) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${req.query.search}&page=${req.query.page}&page_size=${PAGE_SIZE}&key=${RAWG_SECRET}`
    )
    const data = await response.json()
    res.status(200).json({ status: 'success', data })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error })
  }
})

export default handler
