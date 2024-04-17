'use client'

const DestinationTabs = () => {
    return (
        <div className="mt-4 ">
            <div role="tablist" className="tabs tabs-lifted">
                <a role="tab" className="tab">Activities</a>
                <a role="tab" className="tab tab-active [--tab-bg:accent] [--tab-border-color:white] text-white font-bold">Hotels</a>
                <a role="tab" className="tab">Book</a>
            </div>
        </div>
    )
}

export default DestinationTabs