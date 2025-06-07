import { Client, SimpleFieldType } from '@hygraph/management-sdk'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({
	authToken: process.env.HYGRAPH_TOKEN,
	defaultEnvironment: 'master',
})

async function createSchema() {
	try {
		console.log('🚀 Creating BlogPost model...')
    const models = await client.listModels()
		console.log('🔍 Existing models:', models)

		await client.createModel({
			apiId: 'BlogPost',
			apiIdPlural: 'BlogPosts',
			displayName: 'Blog Post',
		})
		console.log('✅ BlogPost model created')

		await client.createSimpleField({
			modelApiId: 'BlogPost',
			apiId: 'title',
			displayName: 'Title',
			type: SimpleFieldType.String,
			isRequired: true,
			isList: false,
		})

		console.log('✅ Title field created')
	} catch (error) {
		console.error('❌ Error during schema creation:', error)
	}
}

createSchema()
