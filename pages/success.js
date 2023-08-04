import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {AppLayout} from "../components/AppLayout";
import {getAppProps} from "../utils/getAppProps";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Success() {
    return (
        <div className="h-full overflow-hidden">
            <div className="text-green-600 flex h-full w-full flex-col justify-center items-center">
                <FontAwesomeIcon icon={faShoppingCart} className="text-8xl" />
                <h1 className="mb-6">Thank you for purchasing more tokens.</h1>

                <div>
                    <Link href="/post/new" className="btn w-80">
                        Create New Post
                    </Link>
                </div>
            </div>
        </div>
    )
}

Success.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const props = await getAppProps(context)
        return {
            props
        }
    }
})
