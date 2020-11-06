import nc from 'next-connect'
import Cors from 'cors'

const { RAWG_SECRET } = process.env
const handler = nc()
const cors = Cors({
  methods: ['GET']
})

handler.use(cors)

handler.get(async (req, res) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${req.query.id}?key=${RAWG_SECRET}`
    )
    const data = await response.json()
    res.status(200).json({ status: 'success', data })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error })
  }
})

export default handler
