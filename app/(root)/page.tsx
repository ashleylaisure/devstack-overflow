import { auth } from "@/auth"
import QuestionCard from "@/components/cards/QuestionCard"
import HomeFilter from "@/components/filters/HomeFilter"
import LocalSearch from "@/components/search/LocalSearch"
import { Button } from "@/components/ui/button"
import ROUTES from "@/constants/routes"
import Link from "next/link"

const questions = [
        { id: 1, 
            title: "How to learn React", 
            description: "Learn the basics of React.js", 
            tags: [
                { id: 1, name: "React" },
                { id: 2, name: "JavaScript" }
            ], 
            author: { id: 1, name: "John Doe", image:'/icons/avatar.svg' },
            upvotes: 10,
            answers: 5,
            views: 100,
            createdAt: new Date()
        },
        { id: 2, 
            title: "How to learn JavaScript", 
            description: "Learn the basics of JavaScript", 
            tags: [
                { id: 1, name: "JavaScript" },
                { id: 2, name: "JavaScript" }
            ], 
            author: { id: 1, name: "John Doe", image: '/icons/avatar.svg'},
            upvotes: 10,
            answers: 5,
            views: 100,
            createdAt: new Date()
        },
    ]

interface SearchParams {
    searchParams: Promise<{ [key: string]: string }>
}

const Home = async ({searchParams}: SearchParams) => {
    // const session = await auth()
    // console.log(session)
    const { query = "", filter = "" } = await searchParams;

    const filteredQuestions = questions.filter((question) => {
        const matchesQuery = question.title
            .toLowerCase()
            .includes(query.toLowerCase());
        const matchesFilter = filter
            ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
            : true;
        return matchesQuery && matchesFilter;
    });

    return (
        <>
        <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className='h1-bold text-dark100_light900'>All Questions</h1>

            <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900" asChild>
                <Link href={ROUTES.ASK_QUESTION}>
                    Ask a Question
                </Link>
            </Button>
        </section>

        <section className="mt-11">
            <LocalSearch
                route='/'
                imgSrc='/icons/search.svg' 
                placeholder='Search questions...' 
                otherClasses="flex-1" />
        </section>

        <HomeFilter />

        <div className="mt-10 flex w-full flex-col gap-6">
            {filteredQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
            ))}
        </div>

        </>
    )
}


export default Home
