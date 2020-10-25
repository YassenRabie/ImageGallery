import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CategorieFilter from './CategorieFilter'
import PhotoModal from './Modal'

const Gallery = () => {
    const [galleryData, setGalleryData] = useState({
        photos: [],
        loading: false,
        page: 1,
        query: 'nature',
        modalPhoto: null
    })

    const [photoModal, setPhotoModal] = useState(false)

    useEffect(() => {
        getPhotos(false)
    }, [galleryData.page])

    const handleTyping = (e) => {
        setGalleryData({ ...galleryData, query: e.target.value })
    }

    const handleCategorieChange = (e) => {
        e.preventDefault()
        getPhotos(true)
    }

    const closePhotoModal = () => {
        setPhotoModal(false)
    }

    const showPhotoModal = (image) => {
        setGalleryData({ ...galleryData, modalPhoto: image })
        setPhotoModal(true)
    }

    const getPhotos = (clearPhotos) => {
        const queryText = galleryData.query || 'nature'
        if (clearPhotos) {
            fetch(`https://api.pexels.com/v1/search/?page=${galleryData.page}&per_page=50&query=${queryText}`, {
                headers: {
                    'Authorization': '563492ad6f91700001000001755cef201bf74a8690df838a720ba8d6'
                }
            })
                .then(response => response.json())
                .then(data => setGalleryData({ ...galleryData, photos: [...data.photos] }))
        } else {
            fetch(`https://api.pexels.com/v1/search/?page=${galleryData.page}&per_page=50&query=${queryText}`, {
                headers: {
                    'Authorization': '563492ad6f91700001000001755cef201bf74a8690df838a720ba8d6'
                }
            })
                .then(response => response.json())
                .then(data => setGalleryData({ ...galleryData, photos: [...galleryData.photos, ...data.photos] }))
        }
    }

    return (
        <>
            <PhotoModal photoModalOpen={photoModal} closePhotoModal={closePhotoModal} photo={galleryData.modalPhoto} />
            <CategorieFilter value={galleryData.query} handleCategorieChange={handleCategorieChange} handleTyping={handleTyping} />
            <InfiniteScroll
                dataLength={galleryData.photos.length}
                next={() => setGalleryData({ ...galleryData, page: galleryData.page + 1 })}
                hasMore={true}
                className="photos-container"
            >
                {galleryData.photos.map(image => (
                    <img src={image.src.portrait} onClick={() => showPhotoModal(image)} />
                ))}
            </InfiniteScroll>
            {(galleryData.photos.length === 0) && <p>There is no images for this search...</p>}
        </>
    )
}

export default Gallery
