import React from 'react'
import Modal from 'react-modal'

const PhotoModal = ({ photo, photoModalOpen, closePhotoModal }) => {

    return (
        <Modal
            isOpen={photoModalOpen}
            onRequestClose={closePhotoModal}
            closeTimeoutMS={0}
            className="modal"
            style={{ overlay: { zIndex: 1000 } }}
        >
            {photo &&
                <>
                    <div className="close" onClick={closePhotoModal}>
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                    <div className="modal-container" >
                        <a href={photo.url} target="_blank" rel="noreferrer"><img src={photo.src.portrait} /></a>
                    </div>
                </>
            }
        </Modal>

    )
}

export default PhotoModal
