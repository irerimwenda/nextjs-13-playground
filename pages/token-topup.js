import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {AppLayout} from "../components/AppLayout";
import {getAppProps} from "../utils/getAppProps";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBlog, faCoins} from "@fortawesome/free-solid-svg-icons";

export default function TokenTopup() {
    const handleClick = async () => {
        const result = await fetch('/api/addTokens', {
            method: 'POST',
        })
        const json = await result.json()
        console.log(json)
        window.location.href = json.session.url
    }

    return (
        <div className="h-full overflow-hidden">
            <div className="text-green-600 flex h-full w-full flex-col justify-center items-center">
                <FontAwesomeIcon icon={faCoins} className="text-8xl text-yellow-500" />
                <h1>Token topup</h1>
                <button className="btn w-80" onClick={handleClick}>Add tokens</button>
            </div>
        </div>
    )
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

// export const getServerSideProps = withPageAuthRequired(() => {
//     return {
//         props: {
//
//         }
//     }
// })

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const props = await getAppProps(context)
        return {
            props
        }
    }
})
