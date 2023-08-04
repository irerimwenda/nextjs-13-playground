import {getSession, withApiAuthRequired} from "@auth0/nextjs-auth0";
import {Configuration, OpenAIApi} from "openai";
import clientPromise from "../../lib/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
    const {user} = await getSession(req, res)
    const client = await clientPromise
    const db = client.db("blogapp")
    const userProfile = await db.collection("users").findOne({
        auth0Id: user.sub
    });

    if(!userProfile?.availableTokens) {
        res.status(403).json({error: 'Not enough tokens'})
        return
    }


    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(config)

    const {topic, keywords} = req.body

    if(!topic || !keywords) {
        res.status(422).json({error: 'Missing topic or keywords'})
        return
    }

    if (topic.length > 80 || keywords.length > 80) {
        res.status(422).json({error: 'Topic or keywords too long'})
        return
    }

    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     temperature: 0,
    //     max_tokens: 3600,
    //     prompt: `Write a blog post about ${topic} with the following keywords: ${keywords}
    //     The content should be formatted in SEO friendly way and should be at least 100 words long.
    //     The response must include appropriate HTML title and meta description content.
    //     The return format must be stringified JSON in the following format:
    //     {
    //         "postContent": "The content of the blog post goes here",
    //         "title": "The title of the blog post goes here",
    //         "metaDescription": "The meta description of the blog post goes here"
    //     }
    //     `,
    // })
    // res.status(200).json({ post: JSON.parse(response.data.choices[0]?.text.split("\n").join("")) })

    // const response = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //         {
    //             role: 'system',
    //             content: 'You are a system Generator.'
    //         }, {
    //             role: 'user',
    //             content: `Write a blog post about ${topic} with the following keywords: ${keywords}
    //                     The content should be formatted in SEO friendly way and should be at least 100 words long.
    //                     The response must include appropriate HTML title and meta description content.
    //                     The return format must be stringified JSON in the following format:
    //                     {
    //                         "postContent": "The content of the blog post goes here",
    //                         "title": "The title of the blog post goes here",
    //                         "metaDescription": "The meta description of the blog post goes here"
    //                     }
    //                     `,
    //         }
    //     ],
    //     max_tokens: 3600,
    //     temperature: 0,
    // })

    await db.collection("users").updateOne({
      auth0Id: user.sub
    }, {
        $inc: {
            availableTokens: -1
        }
    });

    // const parsed = JSON.parse(response.data.choices[0]?.message.content.split("\n").join(""))
    const parsed = 'Hello world'

    const post = await db.collection("posts").insertOne({
        postContent: 'Content',
        title: 'Title',
        metaDescription: "Meata",
        topic,
        keywords,
        userId: userProfile._id,
        created: new Date()
    })

    // const post = await db.collection("posts").insertOne({
    //     postContent: parsed?.postContent,
    //     title: parsed?.title,
    //     metaDescription: parsed?.metaDescription,
    //     topic,
    //     keywords,
    //     userId: userProfile._id,
    //     created: new Date()
    // })

    // console.log(response)
    // res.status(200).json({ post: parsed })
    res.status(200).json({ postId: post.insertedId })
})
