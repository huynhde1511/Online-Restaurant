import { db } from "@/lib/firebase"
import { Store } from "@/type-db"
import { auth } from "@clerk/nextjs/server"
import { doc, getDoc } from "firebase/firestore"
import { redirect } from "next/navigation"
import { SettingForm } from "./components/settings-form"


interface SettingPageProps { 
  params: { 
    storeId: string
  }
} 
const SettingPage = async({params}:SettingPageProps) => { 
  const {userId} = auth() 
  if(!userId){ 
    redirect("/sign-in")
  } 
  const store = (await getDoc(doc(db, "stores", params.storeId))
  ).data() as Store 
  if(!store || store.userId !== userId){ 
    redirect("/")
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-8 pt-6"> 
        <SettingForm initialData={store}/>
      </div>
    </div>
  )
}
export default SettingPage 

