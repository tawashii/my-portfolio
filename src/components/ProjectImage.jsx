import { useEffect, useRef, useState } from 'react'

function ProjectImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef(null)
  const observerRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observerRef.current.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && shouldLoad) {
      setIsLoaded(true)
    }

    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null
        imgRef.current.onerror = null
      }
    }
  }, [shouldLoad])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    console.error(`Failed to load image: ${src}`)
  }

  if (error) {
    return (
      <div
        className="project-image-error"
        role="img"
        aria-label="画像の読み込みに失敗しました"
      >
        <span className="visually-hidden">画像の読み込みに失敗しました</span>
      </div>
    )
  }

  return (
    <div className={`project-image ${isLoaded ? 'loaded' : ''}`}>      <img
        ref={imgRef}
        src={shouldLoad ? src : ''}
        data-src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        width="800"
        height="600"
        style={{
          aspectRatio: '4/3',
          objectFit: 'cover',
        }}
      />
      {!isLoaded && <div className="image-placeholder" aria-hidden="true" />}
    </div>
  )
}

export default React.memo(ProjectImage)
