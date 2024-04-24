import React, { useState } from 'react'
import { paymentCompletion } from '../apis/maincontrollers/paymentCompletion';

interface Props {
    modalOpen: any;
    setModalOpen: (modalOpen: any) => void;
    budget: any;
    user: any;
    tripId: any;
    setTab: (destTab: any) => void;
}

const CheckOutModal: React.FC<Props> = ({ modalOpen, setModalOpen, budget, user, tripId, setTab }) => {
    const [loading, setLoading] = useState<any>(false);
    const handleClose = () => {
        setModalOpen(false);
    }
    const handlePay = async() => {
        setLoading(true);
        const {status, data} = await paymentCompletion({tripId, amount: budget});
        if(status==200){
            setLoading(false);
            setTab('Upcoming');
            handleClose();
        }
    }
    return (
        <dialog id="my_modal_1" className={`modal ${modalOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="font-bold text-sm">Payment</h3>
                <div className='flex flex-col p-2 mt-4'>
                    <div className='flex flex-col'>
                        <label className='mb-1 text-xs'>Contact Information</label>
                        <input className='input input-xs input-accent' placeholder='someone@example.com' value={user?.email}/>
                        <input className='input input-xs input-accent mt-1' placeholder='Phone: 9999900000' value={user?.phone}/>
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label className='mb-1 text-xs'>Card Information</label>
                        <input className='input input-xs input-accent' placeholder='1234 1234 1234 1234' />
                        <div className='flex flex-row mt-1'>
                        <input className='input input-xs input-accent w-1/2' placeholder='MM/YY' />
                        <input className='input input-xs input-accent w-1/2 ml-1' placeholder='CVC' />
                        </div>
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label className='mb-1 text-xs'>Card Holder Name</label>
                        <input className='input input-xs input-accent' placeholder='Full Name on Card' />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label className='mb-1 text-xs'>Country/Region</label>
                        <input className='input input-xs input-accent' placeholder='Country' />
                    </div>
                </div>
                <div className="modal-action flex">
                    <div className='flex flex-row'>
                        <button className="btn btn-sm btn-accent text-white mr-2" onClick={handlePay}>Pay INR {budget}.00 {loading && <span className="loading loading-infinity loading-sm"></span>}</button>
                        <button className="btn btn-sm" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default CheckOutModal