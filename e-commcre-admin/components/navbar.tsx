import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'
import { StoreSwitcher } from './store-switcher'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Store } from '@/type-db'

export const Navbar =async () => { 
    const {userId} = auth(); 
    if(!userId) { 
        redirect("/sign-in"); 
    }  

    const storeSnap = await getDocs ( 
        query(collection(db, "stores"), where("userId", "==", userId))
    )
    let stores = [] as Store[]; 
    storeSnap.forEach(doc => { 
        stores.push(doc.data() as Store)
    })

  return (
    <div className='border-b'> 
        <div className='flex h-16 items-center px-4'> 
            <StoreSwitcher items={stores}/>
            {/* routes */}  
            <MainNav/>
            {/* userprofile */}
            <div className='ml-auto'>
                <UserButton afterSignOutUrl='/'/> 
            </div>
        </div> 
    </div>
  )
}
