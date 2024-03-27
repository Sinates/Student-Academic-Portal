import React, { use, useEffect, useState } from "react";
import { useRouter } from 'next/router';

function HomePage() {
    const router = useRouter();
    const [role, setRole] = useState('');


    useEffect(() => {
        setRole(localStorage.getItem('role'));
  
    }, [])
    useEffect(() => {   
        if (role === 'Admin') {
            router.push('/admin')
        } else if (role === 'Teacher') {
            router.push('/teachers/dashboard')
        }
        else if (role === 'Student') {
            router.push('/students/Dashboard')
        }
        else {
            router.push('/signin')
        }
    },[role])
   

    return (
        <div>
            
        </div>
    )
}

export default HomePage
