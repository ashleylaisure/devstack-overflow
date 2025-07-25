import { auth } from "@/auth"
import ROUTES from "@/constants/routes"

const Home = async () => {
    const session = await auth()
    // console.log(session)
    return (
        <>
            <h1 className='text-3xl font-space-grotesk'>Hello Next.js</h1>
        </>
    )
}


export default Home
