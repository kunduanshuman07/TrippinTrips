'use client'

interface Props{
    destTabs: any;
    setDesttabs: (destTabs: any) => void;
}

const MyTripsTabs:React.FC<Props> = ({destTabs, setDesttabs}) => {
    return (
        <div className="mt-4">
            <div className="w-full flex flex-row shadow-md pr-2 pl-0">
                <button className="text-sm sm:w-1/12 w-1/3 pb-2" style={{borderBottom: destTabs==='Pending'?"3px solid #5eead4": '', color: destTabs==='Pending'?'#14b8a6': ''}} onClick={()=>setDesttabs('Pending')}>Pending</button>
                <button className="text-sm sm:w-1/12 w-1/3 pb-2" onClick={()=>setDesttabs('Upcoming')} style={{borderBottom: destTabs==='Upcoming'?"3px solid #5eead4": '', color: destTabs==='Upcoming'?'#14b8a6': ''}} >Upcoming</button>
                <button className="text-sm sm:w-1/12 w-1/3 pb-2" onClick={()=>setDesttabs('Ongoing')} style={{borderBottom: destTabs==='Ongoing'?"3px solid #5eead4": '', color: destTabs==='Ongoing'?'#14b8a6': ''}} >Ongoing</button>
                <button className="text-sm sm:w-1/12 w-1/3 pb-2" onClick={()=>setDesttabs('Completed')} style={{borderBottom: destTabs==='Completed'?"3px solid #5eead4": '', color: destTabs==='Completed'?'#14b8a6': ''}} >Completed</button>
            </div>
        </div>
    )
}

export default MyTripsTabs