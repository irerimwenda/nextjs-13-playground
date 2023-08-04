import {useUser} from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {Logo} from "../Logo";

export const AppLayout = ({ children, availableTokens, posts, postId }) => {
    const {user} = useUser()

    return (
        <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
            <div className="flex flex-col text-white overflow-hidden">
                <div className="bg-slate-800 px-2">
                    <div>
                        <Logo/>
                    </div>

                    <div className="mb-6">
                        <Link href="/post/new" className="btn">
                            New Post
                        </Link>
                    </div>

                    <div className="mb-6">
                        <Link href="/token-topup" className="block mt-2 text-center">
                            <FontAwesomeIcon icon={faCoins} className="text-yellow-500 "/>
                            <span className="pl-1">{availableTokens} tokens available</span>
                        </Link>
                    </div>
                </div>

                <div className="px-4 flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800">
                    {posts.map((post, index) => (
                        <Link href={`/post/${post._id}`} key={index}
                              className={`py-1 border block mb-1 text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${postId === post._id ? "bg-white/20 border-white" : "border-white/0"}`}>
                            {post.topic}
                        </Link>
                    ))}
                </div>

                <div className="bg-cyan-800">
                    <div className="flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
                        {user ? (
                            <>
                                <div className="min-w-[50px]">
                                    <Image src={user.picture} alt={user.name} height={50} width={50} className="rounded-full"/>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold">{user.email}</p>
                                    <Link href="/api/auth/logout" className="text-sm">
                                        Sign Out
                                    </Link>
                                </div>

                            </>
                        ): (
                            <Link href="/api/auth/login">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>


            {children}
        </div>
    );
}
