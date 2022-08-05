import { createApp } from 'https://deno.land/x/servest@v1.3.4/mod.ts';

let colors = [];

function getColorList() {
	let list = '<ul>';
	colors.forEach(function (item, index) {
		// console.log(item, index);
		list += item;
	});
	list += '</ul>';

	return list;
}

const app = createApp();

app.get('/coderhouse', async (req: any) => {
	const colorList = getColorList();
	const html =
		'<html><body><h2>Color Selector</h2><p>Pick a color from the list:</p><form action="/coderhouse" method="post"><label for="colors">Colors:</label><select id="colors" name="colors"><option value="red">Red</option><option value="blue">Blue</option><option value="purple">Purple</option><option value="orange">Orange</option></select><input type="submit"></form>' +
		colorList +
		'</body></html>';

	await req.respond({
		status: 200,
		headers: new Headers({
			'content-type': 'text/html',
		}),
		// body: "Hola CODERHOUSE",
		body: html,
	});
});

app.post('/coderhouse', async (req: any) => {
	const bodyForm = await req.formData();
	const selectedColor = bodyForm.value('colors');
	console.log(selectedColor);

	colors.push('<li style="color:' + selectedColor + ';">' + selectedColor + '</li>');

	const colorList = getColorList();
	const html =
		'<html><body><h2>Color Selector</h2><p>Pick a color from the list:</p><form action="/coderhouse" method="post"><label for="colors">Colors:</label><select id="colors" name="colors"><option value="red">Red</option><option value="blue">Blue</option><option value="purple">Purple</option><option value="orange">Orange</option></select><input type="submit"></form>' +
		colorList +
		'</body></html>';

	await req.respond({
		status: 200,
		headers: new Headers({
			'content-type': 'text/html',
		}),
		body: html,
	});
});

const port = 3000;
console.log(`Server running on http://localhost:${port}`);
app.listen({ port });
