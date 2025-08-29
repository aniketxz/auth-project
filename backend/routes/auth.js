import express from 'express'

const router = express.Router()

router.post('/request-otp', (req, res) => {
  return res.json({otp: '2458'})
})

router.post('/verify-otp', (req, res) => {

})

export default router