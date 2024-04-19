'use client'

interface Props{
    destTabs: any;
    setDesttabs: (destTabs: any) => void;
}

const DestinationTabs:React.FC<Props> = ({destTabs, setDesttabs}) => {
    return (
        <div className="mt-4">
            <div className="w-full flex flex-row shadow-md pr-2 pl-0">
                <button className="text-sm sm:w-1/12 w-1/3 pb-2" style={{borderBottom: destTabs==='Activities'?"3px solid #5eead4": '', color: destTabs==='Activities'?'#14b8a6': ''}} onClick={()=>setDesttabs('Activities')}>Activities</button>
                <button className="text-sm sm:w-1/12 w-1/3 pb-2" onClick={()=>setDesttabs('Hotels')} style={{borderBottom: destTabs==='Hotels'?"3px solid #5eead4": '', color: destTabs==='Hotels'?'#14b8a6': ''}} >Hotels</button>
                <button className="text-sm sm:w-1/12 w-1/3 pb-2" onClick={()=>setDesttabs('Checkout')} style={{borderBottom: destTabs==='Checkout'?"3px solid #5eead4": '', color: destTabs==='Checkout'?'#14b8a6': ''}} >Checkout</button>
            </div>
        </div>
    )
}

export default DestinationTabs