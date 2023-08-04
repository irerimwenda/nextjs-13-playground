import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {AppLayout} from "../../components/AppLayout";
import {useState} from "react";
import {useRouter} from "next/dist/client/compat/router";
import {getAppProps} from "../../utils/getAppProps";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBlog} from "@fortawesome/free-solid-svg-icons";

export default function NewPost({props}) {
    const router = useRouter()
    // const [postContent, setPostContent] = useState('')
    const [topic, setTopic] = useState('')
    const [keywords, setKeywords] = useState('')
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('/api/generatePost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({topic, keywords})
            })
            const json = await response.json()
            console.log(json)
            // console.log(json.post.postContent)
            // setPostContent(json.post.postContent)
            if(json?.postId) {
                await router.push(`/post/${json.postId}`)
            }
        } catch (e) {
            setLoading(false)
        }
    }
    return (
        <div className="h-full overflow-hidden">
            {loading && (
                <div className="text-green-600 flex h-full animate-pulse w-full flex-col justify-center items-center">
                    <FontAwesomeIcon icon={faBlog} className="text-8xl" />
                    <h6>Loading...</h6>
                </div>
            )}

            {!loading && (
            <div className="w-full h-full flex flex-col overflow-auto">
                <form onSubmit={handleSubmit} className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200">
                    <div>
                        <label>
                            <strong>Generate a blog post on the topic of:</strong>
                        </label>
                        <textarea
                            className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            maxLength={80}/>
                    </div>
                    <div>
                        <label>
                            <strong>Targeting the following keywords:</strong>
                        </label>
                        <textarea
                            className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            maxLength={80}/>
                        <small className="block mb-2">Separate keywords with comma.</small>
                    </div>
                    <button className="btn" type="submit" disabled={!topic.trim() || !keywords.trim()}>
                        Generate
                    </button>
                </form>

                {/*<div className="max-w-screen-sm p-10" dangerouslySetInnerHTML={{__html: postContent}}>*/}
                {/*</div>*/}
            </div>
            )}
        </div>
    );
}

NewPost.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

// export const getServerSideProps = withPageAuthRequired(() => {
//     return {
//         props: {
//
//         }
//     }
// })
//

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const props = await getAppProps(context)
        if(!props.availableTokens) {
            return {
                redirect: {
                    destination: '/token-topup',
                    permanent: false
                }
            }
        }
        return {
            props
        }
    }
})
