import { cancelTripData } from "../apis/maincontrollers/cancelTripData";
import { useState } from "react";

interface Props {
    modalOpen: any;
    setModalOpen: (modalOpen: any) => void;
    dest_name: any;
    trip_id: any;
}

const CancelTripModal: React.FC<Props> = ({ modalOpen, setModalOpen, dest_name, trip_id }) => {
    const [loading, setLoading] = useState<any>(false);
    const handleClose = () => {
        setModalOpen(false);
    }
    const cancelTrip = async() => {
        setLoading(true);
        const {status, data} = await cancelTripData({trip_id: trip_id});
        if(status==200){
            window.location.reload();
        }
    }
    return (
        <dialog id="my_modal_1" className={`modal ${modalOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="font-bold text-sm text-error">You sure? Trip to {dest_name} will be cancelled following this action.</h3>
                <div className="modal-action flex">
                    <div className='flex flex-row'>
                        <button className="btn btn-sm btn-error text-white mr-2" onClick={cancelTrip}>Cancel {loading && <span className="loading loading-spinner loading-xs"></span>}</button>
                        <button className="btn btn-sm" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default CancelTripModal