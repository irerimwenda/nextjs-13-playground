import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {AppLayout} from "../../components/AppLayout";
import clientPromise from "../../lib/mongodb";
import {ObjectId} from "mongodb";
import {faHashtag, faTag} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {getAppProps} from "../../utils/getAppProps";

export default function Post(props) {
    console.log(props)
    return (
        <div className="overflow-auto h-full">
            <div className="max-w-screen-sm mx-auto">
                <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
                    SEO title and meta description
                </div>
                <div className="p-4 my-2 border border-stone-200 rounded-md">
                    <div className="text-blue-600 text-2xl font-bold">{props.title}</div>
                    <div className="mt-2">{props.metaDescription}</div>
                </div>

                <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
                    Keywords
                </div>
                <div className="flex flex-wrap pt-2 gap-1">
                    {props.keywords.split(',').map((keyword, index) => (
                        <div key={index} className="p-2 rounded-full bg-slate-800 text-white">
                            <FontAwesomeIcon icon={faHashtag} className="text-yellow-500 mr-1"/>
                            {keyword}
                        </div>
                    ))}
                </div>


                <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
                    Post content
                </div>
                <div dangerouslySetInnerHTML={{__html: props.postContent || ''}}>

                </div>
            </div>
        </div>
    );
}

Post.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const props = await getAppProps(context)
        const userSession = await getSession(context.req, context.res)
        const client = await clientPromise
        const db = await client.db("blogapp")
        const user = await db.collection("users").findOne({
            auth0Id: userSession.user.sub
        })
        const post = await db.collection("posts").findOne({
            _id: new ObjectId(context.params.postid),
            userId: user._id
        })

        if(!post) {
            return {
                redirect: {
                    destination: '/post/new',
                    permanent: false
                }
            }
        }

        return {
            props: {
                postContent: post.postContent,
                title: post.title,
                metaDescription: post.metaDescription,
                keywords: post.keywords,
                ...props
            }
        }
    }
})
