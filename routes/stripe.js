const stripe = require('stripe')(process.env.STRIPE_KEY);
const express = require('express');
const router = express.Router();

/**
 * POST Payment
 */
router.post('/payment', function (req, res, next) {
	stripe.charges.create({
		amount: req.body.amount,
		currency: 'EUR',
		description: 'One-time setup fee',
		source: req.body.token.id
	}, (err, charge) => {
		if (err) {
			next(err);
		}
		res.json({
			success: true,
			status: 'Payments successfull.'
		})
	})
	console.log('req.body', req.body);
});