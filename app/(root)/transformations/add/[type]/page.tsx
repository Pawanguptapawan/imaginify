// import Header from '@/components/shared/Header';
// import React from 'react'

// const AddTransformationTypePage = () => {
//   return (
//     // <div>
//     //   AddTransformationTypePage
//     // </div>
//   <Header title='Transformation Title' subtitle='Transformation Subtitle' />

//   )
// }

// export default AddTransformationTypePage;
import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';

import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  
  const transformation = transformationTypes[type];
const { userId }=auth()
   if(!userId) redirect('/sign-in')

  const user = await getUserById(userId);

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
<section
className="mt-10"
>
        <TransformationForm 
        action='Add'
        userId={user._id}
type={transformation.type as TransformationTypeKey}
creditBalance={user.creditBalance}
        />
        </section>
     
    </>
  )
}

export default AddTransformationTypePage