import nc from 'next-connect'

const { RAWG_SECRET } = process.env
const PAGE_SIZE = 10

const handler = nc()

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
