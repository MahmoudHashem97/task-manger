// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandbox7f2732868f2f493195c9da80a8a2f911.mailgun.org';
// const mg = mailgun({apiKey: 'ef7d1fa0b25427578c302535619a361e-7764770b-44e64d5c', domain: DOMAIN});
// const data = {
// 	    from: "Mailgun Sandbox <postmaster@sandbox7f2732868f2f493195c9da80a8a2f911.mailgun.org>",
// 		to: "mahmoud.hashem97@gmail.com",
// 		subject: "Hello me",
// 		text: "Testing some Mailgun awesomness!",
// };
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// });





// const formData = require('form-data');
// const Mailgun = require('mailgun-js');
// const mailgun = new Mailgun(formData);
// const key ='ef7d1fa0b25427578c302535619a361e-7764770b-44e64d5c'
// const mg = mailgun.client({
// 	username: 'api',
// 	key: key,
// });
// mg.messages
// 	.create(sandbox7f2732868f2f493195c9da80a8a2f911.mailgun.org, {
// 		from: "Mailgun Sandbox <postmaster@sandbox7f2732868f2f493195c9da80a8a2f911.mailgun.org>",
// 		to: ["mahmoud.hashem97@gmail.com"],
// 		subject: "Hello me",
// 		text: "Testing some Mailgun awesomness!",
// 	})
// 	.then(msg => console.log(msg)) // logs response data
// 	.catch(err => console.log(err)); // logs any error`;

