import ROUTES from '@/constants/routes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import TagCard from '../cards/TagCard'

const hotQuestions = [
    {_id: '1', title: 'What is the best way to learn React?'},
    {_id: '2', title: 'How to optimize performance in Next.js?'},
    {_id: '3', title: 'What are the differences between TypeScript and JavaScript?'},
    {_id: '4', title: 'How to handle state management in large React applications?'},
]

const popularTags = [
    {id: '1', name: 'React', questions: 100},
    {id: '2', name: 'Next.js', questions: 80},
    {id: '3', name: 'JavaScript', questions: 120},
    {id: '4', name: 'TypeScript', questions: 90},
    {id: '5', name: 'CSS', questions: 70},
]

const RightSidebar = () => {
    return (
        <section className='pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col
        gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden'>
            <div>
                <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
                <div className="mt-7 flex w-full flex-col gap-[30px]">
                    {hotQuestions.map(({_id, title}) => (
                        <Link href={ROUTES.QUESTION(_id)} key={_id} 
                            className='flex cursor-pointer items-center justify-between gap-7'> 
                            <p className='body-medium text-dark500_light700'>{title}</p>
                            <Image src='/icons/chevron-right.svg' alt='Chevron Right' width={20} height={20} className='invert-colors'/>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='mt-16'>
                <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
                <div className="mt-7 flex flex-col gap-4">
                    {popularTags.map(({id, name, questions}) => (
                        <TagCard key={id} _id={id} name={name} questions={questions} showCount compact/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default RightSidebar
