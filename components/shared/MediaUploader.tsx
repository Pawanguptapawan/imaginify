
"use client";

import React from 'react'
import { useToast } from '../ui/use-toast'
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { dataUrl, getImageSize } from '@/lib/utils';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
type MediaUploaderProps={
  onValueChange:(value:string)=>void;
  setImage:React.Dispatch<any>;
publicId:string;
image:any;
type:string;



}
const MediaUploader = ({onValueChange,
  setImage,
  image,
  publicId,
  type
}:MediaUploaderProps) => {
    const {toast}=useToast()



    const onUploadSuccessHandler=(result:any)=>{
      setImage((prevState:any)=>({
...prevState,
publicId:result?.info?.publicId,
width:result?.info?.width,
height:result?.info?.heigth,
secureUrl:result?.info?.secure_url,

      }))
      onValueChange(result?.info?.public_id)
      toast({
        title:'Image upload successfully',
        description:'1 credit was deducted from your account',
        duration:4000,
        className:'success-toast'
        
      })
    }



    const onUploadErrorHandler=(result:any)=>{
toast({
  title:'Something went wrong while uploading',
  description:'Please try again',
  duration:4000,
  className:'error-toast'

})
    }

  return (
  <CldUploadWidget
  uploadPreset='imaginify'
  options={{
    multiple:false,
    resourceType:'image',

  }}
  onSuccess={onUploadSuccessHandler}
  onError={onUploadErrorHandler}

  >
{({open})=>(
  <div className="flex flex-col gap-4">
<h3 className='h3-bold text-dark-600'>
Original
</h3>
{publicId?(
  <>
 
<div className="cursor-pointer overflow-hidden rounded-[10px]">
  <CldImage
  width={getImageSize(type,image,"width")}
  height={getImageSize(type,image,"width")}
  alt="image"
  sizes={"(max-width:767px) 100vw,50vw"}
  src={publicId}
  placeholder={dataUrl as PlaceholderValue}
  className='media-uploader_cldImage'

  />
  </div>  </>
):(
  <div className="media-uploader_cta" onClick={()=>open()}>
    <div className="media-uploader_cta-image"> 
<Image 
src="/assets/icons/add.svg"
width={24}
alt="Add image"
height={24}

/>


    </div>
    

    <p className="p-14-medium ">Click here to upload image</p>

    </div>
)}
  </div>
 
)}
  </CldUploadWidget>
  )
}

export default MediaUploader
