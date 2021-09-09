import { getParameters } from 'codesandbox/lib/api/define.js'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

const parameters = getParameters({
	files: {
		'package.json': {
			content: {
				dependencies: {}
			}
		},
		'sandbox.config.json': {
			content: { template: 'static' }
		},
		'example.png': {
			isBinary: true,
			content: fs.readFileSync('./example.png', 'utf-8')
		}
	}
})

let reqBody = new FormData()
reqBody.append('parameters', parameters)

axios
	.post('https://codesandbox.io/api/v1/sandboxes/define?json=1', reqBody, {
		headers: reqBody.getHeaders()
	})
	.then(({ data }) => {
		const { sandbox_id } = data

		const finalObject = {
			test: 'test',
			sandbox_id
		}
		console.log(finalObject)
	})
