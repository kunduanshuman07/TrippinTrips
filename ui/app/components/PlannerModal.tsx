import React from 'react'

interface Props {
    modalOpen: any;
    setModalOpen: (modalOpen: any) => void;
    budget: any;
    setBudget: (budget: any) => void;
}

const PlannerModal: React.FC<Props> = ({ modalOpen, setModalOpen, budget, setBudget }) => {
    const handleClose = () => {
        setModalOpen(false);
    }
    return (
        <dialog id="my_modal_1" className={`modal ${modalOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Define your Budget Upper limit</h3>
                <div className='flex flex-row p-2 mt-4'>
                    <label className='my-auto mr-2'>INR </label>
                    <input className="input input-sm input-accent" type='number' placeholder='Budget' onChange={(e)=>setBudget(e.target.value)} value={budget}/>
                </div>
                <div className="modal-action flex">
                    <div className='flex flex-row'>
                        <button className="btn btn-sm btn-accent text-white mr-2" onClick={handleClose}>Set</button>
                        <button className="btn btn-sm" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default PlannerModal